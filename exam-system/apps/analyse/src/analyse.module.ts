import { Module } from '@nestjs/common';
import { AnalyseController } from './analyse.controller';
import { AnalyseService } from './analyse.service';
import { RedisModule } from '@app/redis';
import { PrismaModule } from '@app/prisma';
import { AuthGuard, CommonModule } from '@app/common';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    CommonModule
  ],
  controllers: [AnalyseController],
  providers: [AnalyseService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AnalyseModule {}
