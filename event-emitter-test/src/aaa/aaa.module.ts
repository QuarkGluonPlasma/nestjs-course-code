import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';

@Module({
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule {}
