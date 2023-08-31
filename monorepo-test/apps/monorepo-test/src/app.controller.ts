import { Lib1Service } from './../../../libs/lib1/src/lib1.service';
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Inject(Lib1Service)
  private lib : Lib1Service;

  @Get('aaa')
  aaa() {
    return 'aaa' + this.lib.xxx();
  }
}
