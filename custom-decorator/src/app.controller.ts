import { Controller, Get, Headers, Query, SetMetadata, UseGuards, ParseIntPipe } from '@nestjs/common';
import { Aaa } from './aaa.decorator';
import { AaaGuard } from './aaa.guard';
import { AppService } from './app.service';
import { Bbb } from './bbb.decorator';
import { Ccc } from './ccc.decorator';
import { Ddd } from './ddd.decorator';
import { MyHeaders, MyQuery } from './my.decorator';

@Ddd('eee', 'guang')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('aaa', 'admin')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  @Aaa('admin')
  @UseGuards(AaaGuard)
  getHello2(): string {
    return this.appService.getHello();
  }

  @Bbb('hello2', 'admin')
  getHello3(): string {
    return this.appService.getHello();
  }

  @Get('hello4')
  getHello4(@Ccc() c) {
    return c;
  }

  @Get('hello5')
  getHello5(@Headers('Accept') headers1, @MyHeaders('accept') headers2) {
    console.log(' header1', headers1);
    console.log(' header2', headers2);
  }


  @Get('hello6')
  getHello6(@Query('aaa') aaa, @MyQuery('bbb') bbb) {
    console.log('aaa', aaa);
    console.log('bbb', bbb);
  }

  @Get('hello7')
  getHello7(@Query('aaa', new ParseIntPipe()) aaa, @MyQuery('bbb', new ParseIntPipe()) bbb) {
    console.log('aaa', aaa + 1);
    console.log('bbb', bbb + 1);
  }

  
}
