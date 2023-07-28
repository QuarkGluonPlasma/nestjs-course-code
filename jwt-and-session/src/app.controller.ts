import { Controller, Get, Header, Headers, Inject, Res, Session, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sss')
  sss(@Session() session) {
    console.log(session)
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }

  @Get('ttt')
  ttt(@Headers('authorization') authorization: string, @Res({ passthrough: true}) response: Response) {
    if(authorization) {
      try {
        const token = authorization.split(' ')[1];
        const data = this.jwtService.verify(token);

        const newToken = this.jwtService.sign({
          count: data.count + 1
        });
        response.setHeader('token', newToken);
        return data.count + 1
      } catch(e) {
        console.log(e);
        throw new UnauthorizedException();
      }
    } else {
      const newToken = this.jwtService.sign({
        count: 1
      });

      response.setHeader('token', newToken);
      return 1;
    }
  }
}
