import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { I18nLang } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@I18nLang() lang: string): string {

    console.log(lang);

    return this.appService.getHello();
  }
}
