import { ShortLongMapService } from './short-long-map.service';
import { BadRequestException, Controller, Get, Inject, Param, Query, Redirect, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ShortLongMapService)
  private shortLongMapService: ShortLongMapService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':code')
  @Redirect()
  async jump(@Param('code') code) {
    const longUrl = await this.shortLongMapService.getLongUrl(code);
    if(!longUrl) {
      throw new BadRequestException('短链不存在');
    }
    return {
      url: longUrl,
      statusCode: 302
    }  
  }

  @Get('short-url')
  async generateShortUrl(@Query('url') longUrl) {
    return this.shortLongMapService.generate(longUrl);
  }
}
