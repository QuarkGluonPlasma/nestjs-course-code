import { Controller, Get, Post, Body, Patch, Param, Delete, OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown } from '@nestjs/common';
import { DddService } from './ddd.service';
import { CreateDddDto } from './dto/create-ddd.dto';
import { UpdateDddDto } from './dto/update-ddd.dto';

@Controller('ddd')
export class DddController implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown {
  constructor(private readonly dddService: DddService) {}

  onModuleDestroy() {
    console.log('DddController OnModuleDestroy');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('DddController beforeApplicationShutdown', signal);
  }

  onApplicationShutdown() {
    console.log('DddController onApplicationShutdown');
  }

  onModuleInit() {
    console.log('DddController onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('DddController OnApplicationBootstrap');
  }

  @Post()
  create(@Body() createDddDto: CreateDddDto) {
    return this.dddService.create(createDddDto);
  }

  @Get()
  findAll() {
    return this.dddService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dddService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDddDto: UpdateDddDto) {
    return this.dddService.update(+id, updateDddDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dddService.remove(+id);
  }
}
