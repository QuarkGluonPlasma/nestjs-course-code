import { Body, Controller, Get, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 20, {
      dest: 'uploads'
  }))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: { name: string }) {
      console.log('body', body);
      console.log('files', files);

      const fileName = body.name.match(/(.+)\-\d+$/)[1];
      const chunkDir = 'uploads/chunks_'+ fileName;

      if(!fs.existsSync(chunkDir)){
        fs.mkdirSync(chunkDir);
      }
      fs.cpSync(files[0].path, chunkDir + '/' + body.name);
      fs.rmSync(files[0].path);
  }

  @Get('merge')
  merge(@Query('name') name: string) {
    const chunkDir = 'uploads/chunks_'+ name;

    const files = fs.readdirSync(chunkDir);
    
    let count = 0;
    let startPos = 0;
    files.map(file => {
      const filePath = chunkDir + '/' + file;
      const stream = fs.createReadStream(filePath);
      stream.pipe(fs.createWriteStream('uploads/' + name, {
        start: startPos
      })).on('finish', () => {
        count ++;

        if(count === files.length) {
          fs.rm(chunkDir, {
            recursive: true
          }, () =>{});
        }
      })

      startPos += fs.statSync(filePath).size;
    });
  }
}
