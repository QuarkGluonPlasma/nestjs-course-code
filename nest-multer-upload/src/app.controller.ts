import { FileSizeValidationPipe } from './file-size-validation-pipe.pipe';
import { Body, Controller, FileTypeValidator, Get, HttpException, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { storage } from './my-file-storage';
import { MyFileValidator } from './MyFileValidator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('aaa')
  @UseInterceptors(FileInterceptor('aaa', {
    dest: 'uploads'
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('body', body);
    console.log('file', file);
  }

  @Post('bbb')
  @UseInterceptors(FilesInterceptor('bbb', 3, {
    dest: 'uploads'
  }))
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
    console.log('body', body);
    console.log('files', files);
  }

  @Post('ccc')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'aaa', maxCount: 2 },
    { name: 'bbb', maxCount: 3 },
  ], {
    dest: 'uploads'
  }))
  uploadFileFields(@UploadedFiles() files: { aaa?: Express.Multer.File[], bbb?: Express.Multer.File[] }, @Body() body) {
    console.log('body', body);
    console.log('files', files);
  }

  @Post('ddd')
  @UseInterceptors(AnyFilesInterceptor({
    storage: storage
  }))
  uploadAnyFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
    console.log('body', body);
    console.log('files', files);
  }

  @Post('eee')
  @UseInterceptors(FileInterceptor('aaa', {
    dest: 'uploads'
  }))
  uploadFile2(@UploadedFile(FileSizeValidationPipe) file: Express.Multer.File, @Body() body) {
    console.log('body', body);
    console.log('file', file);
  }

  @Post('fff')
  @UseInterceptors(FileInterceptor('aaa', {
    dest: 'uploads'
  }))
  uploadFile3(@UploadedFile(new ParseFilePipe({
    exceptionFactory: err => {
      throw new HttpException('xxx' + err, 404);
    },
    validators: [
      new MyFileValidator({}),
      new MaxFileSizeValidator({ maxSize: 1000 }),
      new FileTypeValidator({ fileType: 'image/jpeg' }),
    ],
  })) file: Express.Multer.File, @Body() body) {
    console.log('body', body);
    console.log('file', file);
  }

  @Post('hhh')
  @UseInterceptors(FileInterceptor('aaa', {
    dest: 'uploads'
  }))
  uploadFile4(@UploadedFile(new ParseFilePipe({
    validators: [
      new MyFileValidator({})
    ],
  })) file: Express.Multer.File, @Body() body) {
    console.log('body', body);
    console.log('file', file);
  }
}


