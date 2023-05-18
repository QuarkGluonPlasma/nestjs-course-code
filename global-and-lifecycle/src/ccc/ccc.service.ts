import { Injectable, OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown } from '@nestjs/common';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';

@Injectable()
export class CccService implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown  {

  onModuleDestroy() {
    console.log('CccService onModuleDestroy');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('CccService beforeApplicationShutdown', signal);
  }

  onApplicationShutdown() {
    console.log('CccService onApplicationShutdown');
  }

  onModuleInit() {
    console.log('CccService OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log('CccService onApplicationBootstrap');
  }

  create(createCccDto: CreateCccDto) {
    return 'This action adds a new ccc';
  }

  findAll() {
    return `This action returns all ccc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ccc`;
  }

  update(id: number, updateCccDto: UpdateCccDto) {
    return `This action updates a #${id} ccc`;
  }

  remove(id: number) {
    return `This action removes a #${id} ccc`;
  }
}
