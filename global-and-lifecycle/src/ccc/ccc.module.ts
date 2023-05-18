import { Module, OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown  } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';

@Module({
  controllers: [CccController],
  providers: [CccService]
})
export class CccModule implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, BeforeApplicationShutdown, OnApplicationShutdown  {

  constructor(private moduleRef: ModuleRef) {}

  onModuleDestroy() {
    console.log('CccModule onModuleDestroy');
  }

  beforeApplicationShutdown(signal: string) {
    console.log('CccModule beforeApplicationShutdown', signal);
  }

  onApplicationShutdown() {
    const cccService = this.moduleRef.get<CccService>(CccService);
    console.log('--------------------------', cccService.findAll());

    console.log('CccModule onApplicationShutdown');
  }

  onModuleInit() {
    console.log('CccModule OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log('CccModule onApplicationBootstrap');
  }
}
