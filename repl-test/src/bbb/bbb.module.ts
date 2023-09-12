import { Module } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';

@Module({
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule {}
