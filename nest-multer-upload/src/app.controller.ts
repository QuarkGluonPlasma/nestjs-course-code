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
// }
// 大佬，您好。我们公司现在要做一款医疗软件，主要针对用户时医生，里面主要功能已经实现了，现在需要去做类似于插件的功能，我在网上也查了一些相关的方案。
// 第一种就是类似于 vscode插件应用商店的功能， 这种情况实现起来难度比较大，耗费的时间比较长，我们项目周期也比较紧，且我也是第一次开发这种插件功能，所以目前选用这种方案不太可靠；
// 第二种就是想读来说简单点的，直接写好插件，然后在主软件中开辟一个plugins目录，然后当每次打开软件的时候去动态加载这个目录中所包含的插件。

// 那我主要有以下几个问题：
// 1. 我如何将插件放入这个plugins目录下（直接拖入或是别的方案...）？
// 3. 我应该如何去编写插件，在开发插件时应该需要注意的问题？
// 2. 最后就是主软件该如何去检测是否有插件，它们直接的通信如何去做？

// 最后感谢大佬的回答！

