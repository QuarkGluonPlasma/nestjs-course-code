import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { RedisModule } from '@app/redis';
import { PrismaModule } from '@app/prisma';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard, CommonModule } from '@app/common';

@Module({
  imports: [
    RedisModule,
    PrismaModule,
    CommonModule
  ],
  controllers: [ExamController],
  providers: [ExamService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class ExamModule {}
