import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoList } from './todolist-create.dto';
import { UpdateTodoList } from './todolist-update.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create')
  async create(@Body() todoItem: CreateTodoList) {
    return this.appService.create(todoItem);
  }

  @Post('update')
  async update(@Body() todoItem: UpdateTodoList) {
    return this.appService.update(todoItem);
  }

  @Get('delete')
  async delete(@Query('id') id: number) {
    return this.appService.remove(+id);
  }

  @Get('list')
  async list() {
    return this.appService.query();
  }

}
