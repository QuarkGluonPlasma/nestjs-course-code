import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';

@Module({
  providers: [StatisticService],
  controllers: [StatisticController]
})
export class StatisticModule {}
