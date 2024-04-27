import { Controller, Get, Header, Res, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('download')
  @Header('Content-Disposition', `attachment; filename="guang.json"`)
  download(@Res() res: Response) {
    const content = fs.readFileSync('package.json');

    res.end(content);
  }

  @Get('download2')
  @Header('Content-Disposition', `attachment; filename="guang.json"`)
  download2(@Res() res: Response) {
    const stream = fs.createReadStream('package.json');

    stream.pipe(res);
  }


  @Get('download3')
  download3() {
    const stream = fs.createReadStream('package.json');

    return new StreamableFile(stream, {
      type: 'text/plain',
      disposition: `attachment; filename="package.json"`
    });

  }

}
