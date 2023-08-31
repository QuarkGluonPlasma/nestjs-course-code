import { Module } from '@nestjs/common';
import { Lib1Service } from './lib1.service';

@Module({
  providers: [Lib1Service],
  exports: [Lib1Service],
})
export class Lib1Module {}
