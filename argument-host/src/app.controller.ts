import { Controller, Get, Req, SetMetadata, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaException } from './AaaException';
import { AaaFilter } from './aaa.filter';
import { AaaGuard } from './aaa.guard';
import { Roles } from './roles.decorator';
import { Role } from './role';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('aaa', 'bbb')
  getHello(@Req() req: Request): string {
    return this.appService.getHello();
  }
}
