import { AaaInterceptor } from './aaa.interceptor';
import { AaaGuard } from './aaa.guard';
import { Controller, Get, SetMetadata, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@SetMetadata('roles', ['user'])
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AaaGuard)
  @UseInterceptors(AaaInterceptor)
  @SetMetadata('roles', ['admin'])
  getHello(): string {
    return this.appService.getHello();
  }
}
