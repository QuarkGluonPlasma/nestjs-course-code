import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, SetMetadata, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { EmailService } from '@app/email';
import { RedisService } from '@app/redis';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RequireLogin, UserInfo } from '@app/common';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  @Get('register-captcha')
  async captcha(@Query('address') address: string) {
      const code = Math.random().toString().slice(2,8);

      await this.redisService.set(`captcha_${address}`, code, 5 * 60);

      await this.emailService.sendMail({
        to: address,
        subject: '注册验证码',
        html: `<p>你的注册验证码是 ${code}</p>`
      });
      return '发送成功';
  }

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.userService.register(registerUser);
  }

  @Inject(JwtService)
  private jwtService: JwtService;
  
  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
      const user = await this.userService.login(loginUser);
  
      return {
        user,
        token: this.jwtService.sign({
          userId: user.id,
          username: user.username
        }, {
          expiresIn: '7d'
        })
      };
  }

  @Post('update_password')
  async updatePassword(@Body() passwordDto: UpdateUserPasswordDto) {
      return this.userService.updatePassword(passwordDto);
  }

  @Get('update_password/captcha')
  async updatePasswordCaptcha(@Query('address') address: string) {
      if(!address) {
        throw new BadRequestException('邮箱地址不能为空');
      }
      const code = Math.random().toString().slice(2,8);
  
      await this.redisService.set(`update_password_captcha_${address}`, code, 10 * 60);
  
      await this.emailService.sendMail({
        to: address,
        subject: '更改密码验证码',
        html: `<p>你的更改密码验证码是 ${code}</p>`
      });
      return '发送成功';
  }

  @Get('aaa')
  // @SetMetadata('require-login', true)
  @RequireLogin()
  aaa() {
      return 'aaa';
  }

  @Get('bbb')
  bbb() {
      return 'bbb';
  }
}