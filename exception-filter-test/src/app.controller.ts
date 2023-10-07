import { BadGatewayException, BadRequestException, Body, Controller, Get, HttpException, HttpStatus, NotFoundException, Post, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaDto } from './aaa.dto';
import { UnLoginException } from './unlogin.filter';
import { HelloFilter } from './hello.filter';

@Controller()
@UseFilters(HelloFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseFilters(HelloFilter)
  getHello(): string {
    // throw new HttpException('xxxx', HttpStatus.BAD_REQUEST)
    // throw new BadGatewayException('yyy');
    throw new UnLoginException();
    return this.appService.getHello();
  }

  @Post('aaa') 
  aaa(@Body() aaaDto: AaaDto ){
    return 'success';
  }
}
