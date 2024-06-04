
import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private appService: AppService) {}

  @Get('login')
  @UseGuards(AuthGuard('github'))
  async login() {
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req) {
    return this.appService.findUserByGithubId(req.user.id);
  }
}