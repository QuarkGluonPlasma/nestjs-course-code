import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { RedisService } from '@app/redis';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UserService {

  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Inject(RedisService)
  private redisService: RedisService;

  private logger = new Logger();

  async register(user: RegisterUserDto) {
      const captcha = await this.redisService.get(`captcha_${user.email}`);

      if(!captcha) {
          throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
      }

      if(user.captcha !== captcha) {
          throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
      }

      const foundUser = await this.prismaService.user.findUnique({
        where: {
          username: user.username
        }
      });

      if(foundUser) {
        throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
      }

      try {
        return await this.prismaService.user.create({
          data: {
            username: user.username,
            password: user.password,
            email: user.email
          },
          select: {
            id: true,
            username: true,
            email: true,
            createTime: true
          }
        });
      } catch(e) {
        this.logger.error(e, UserService);
        return null;
      }
  }

  async login(loginUserDto: LoginUserDto) {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        username: loginUserDto.username
      }
    });
  
    if(!foundUser) {
        throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
  
    if(foundUser.password !== loginUserDto.password) {
        throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
  
    delete foundUser.password;
    return foundUser;
  }

  async updatePassword(passwordDto: UpdateUserPasswordDto) {
    const captcha = await this.redisService.get(`update_password_captcha_${passwordDto.email}`);
  
    if(!captcha) {
        throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }
  
    if(passwordDto.captcha !== captcha) {
        throw new HttpException('验证码不正确', HttpStatus.BAD_REQUEST);
    }
  
    const foundUser = await this.prismaService.user.findUnique({
      where: {
          username: passwordDto.username
      }
    });
  
    foundUser.password = passwordDto.password;
  
    try {
      await this.prismaService.user.update({
        where: {
          id: foundUser.id
        },
        data: foundUser
      });
      return '密码修改成功';
    } catch(e) {
      this.logger.error(e, UserService);
      return '密码修改失败';
    }
  }
}