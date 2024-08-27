import { Body, Controller, Delete, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ExamService } from './exam.service';
import { MessagePattern } from '@nestjs/microservices';
import { RedisService } from '@app/redis';
import { ExamAddDto } from './dto/exam-add.dto';
import { RequireLogin, UserInfo } from '@app/common';
import { ExamSaveDto } from './dto/exam-save.dto';

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Inject(RedisService)
  redisService: RedisService;

  @Get()
  async getHello() {
    const keys = await this.redisService.keys('*');
    return this.examService.getHello() +  keys;
  }

  @MessagePattern('sum')
  sum(numArr: Array<number>): number {
    return numArr.reduce((total, item) => total + item, 0);
  }

  @Get('find/:id')
  @RequireLogin()
  async find(@Param('id') id: string) {
    return this.examService.find(+id);
  }

  @Post('add')
  @RequireLogin()
  async add(@Body() dto: ExamAddDto, @UserInfo('userId') userId: number) {
    return this.examService.add(dto, userId);
  }

  @Get('list')
  @RequireLogin()
  async list(@UserInfo('userId') userId: number, @Query('bin') bin: string) {
    return this.examService.list(userId, bin);
  }

  @Delete('delete/:id')
  @RequireLogin()
  async del(@UserInfo('userId') userId: number, @Param('id') id: string) {
    return this.examService.delete(userId, +id);
  }

  @Post('save')
  @RequireLogin()
  async save(@Body() dto: ExamSaveDto) {
    return this.examService.save(dto);
  }

  @Get('publish/:id')
  @RequireLogin()
  async publish(@UserInfo('userId') userId: number, @Param('id') id: string) {
    return this.examService.publish(userId, +id);
  }

  @Get('unpublish/:id')
  @RequireLogin()
  async unpublish(@UserInfo('userId') userId: number, @Param('id') id: string) {
    return this.examService.unpublish(userId, +id);
  }
}
