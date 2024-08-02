import { BadRequestException, Body, Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  jwtService: JwtService;

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    if(loginDto.username !== 'guang' || loginDto.password !== '123456') {
      throw new BadRequestException('用户名或密码错误');
    }
    const jwt = this.jwtService.sign({
      username: loginDto.username
    }, {
      expiresIn: '7d'
    });
    return jwt;
  }
}
