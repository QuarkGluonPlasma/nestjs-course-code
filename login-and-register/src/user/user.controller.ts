import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Controller, Post, Body,Inject, Req, Res, Get, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(JwtService)
  private jwtService:JwtService;

  @Post('login')
  async login(@Body() user: LoginDto,  @Res({passthrough: true}) res: Response) {
    const foundUser = await this.userService.login(user);

    if(foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username
        }
      })
      res.setHeader('token', token);
      return 'login success';
    } else {
      return 'login fail';
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user);
  }
}