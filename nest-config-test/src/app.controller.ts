import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ConfigService)
  private configService: ConfigService;

  @Get()
  getHello() {
    return {
      // aaa: this.configService.get('aaa'),
      // bbb: this.configService.get('bbb'),
      // db: this.configService.get('db')
      config: this.configService.get('aaa.bbb.ccc')
    }
  }
}
