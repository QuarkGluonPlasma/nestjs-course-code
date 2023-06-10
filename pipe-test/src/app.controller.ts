import { Body, DefaultValuePipe, Param, ParseArrayPipe, ParseBoolPipe, ParseEnumPipe, ParseFloatPipe, ParseUUIDPipe, Post, ValidationPipe } from '@nestjs/common';
import { Controller, Get, HttpException, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { AaaPipe } from './aaa.pipe';
import { AppService } from './app.service';
import { Ooo } from './dto/ooo.dto';
import { Ppp } from './dto/ppp.dto';
import { MyValidationPipe } from './my-validation.pipe';

enum Ggg {
  AAA = '111',
  BBB = '222',
  CCC = '333'
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('aa', ParseIntPipe) aa: number): number {
    return aa + 1;
  }
  
  @Get('aa')
  aa(@Query('aa', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_FOUND
  })) aa: number): number {
    return aa + 1;
  }

  @Get('bb')
  bb(@Query('aa', new ParseIntPipe({
    exceptionFactory: (msg) => {
      console.log(msg);
      throw new HttpException('xxx ' + msg, HttpStatus.NOT_IMPLEMENTED)
    }
  })) aa: number): number {
    return aa + 1;
  }
  
  @Get('cc')
  cc(@Query('cc', ParseFloatPipe) cc: number) {
    return cc + 1;
  }

  @Get('dd')
  dd(@Query('dd', ParseBoolPipe) dd: boolean) {
    return typeof dd
  }

  @Get('ee')
  ee(@Query('ee', new ParseArrayPipe({
    items: Number
  })) ee: Array<number>) {
    return ee.reduce((total, item) => total + item, 0)
  }

  @Get('ff')
  ff(@Query('ff', new ParseArrayPipe({
    separator: '..',
    optional: true
  })) ff: Array<string>) {
    return ff;
  }

  @Get('gg/:enum')
  gg(@Param('enum', new ParseEnumPipe(Ggg)) e: Ggg) {
    return e;
  }

  @Get('hh/:uuid')
  hh(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return uuid;
  }

  @Get('kkk')
  kkk(@Query('kkk', new DefaultValuePipe('aaa')) kkk: string) {
    return kkk;
  }

  @Get('nnn/:bbb') 
  nnn(@Query('aaa', AaaPipe) aaa: string,@Param('bbb', AaaPipe) bbb: number) {
    return aaa + bbb;
  }

  @Post('ooo')
  ooo(@Body(MyValidationPipe) obj: Ooo){
    console.log(obj);
  }

  @Post('ppp')
  ppp(@Body() post: Ppp) {
    console.log(post);
  }
}

