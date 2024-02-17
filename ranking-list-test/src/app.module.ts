import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [RedisModule, RankingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
