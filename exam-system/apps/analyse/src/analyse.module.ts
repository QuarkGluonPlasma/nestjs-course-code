import { Module } from '@nestjs/common';
import { AnalyseController } from './analyse.controller';
import { AnalyseService } from './analyse.service';

@Module({
  imports: [],
  controllers: [AnalyseController],
  providers: [AnalyseService],
})
export class AnalyseModule {}
