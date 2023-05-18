import { Module } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';

@Module({
  imports: [],
  controllers: [BbbController],
  providers: [BbbService]
})
export class BbbModule {}
