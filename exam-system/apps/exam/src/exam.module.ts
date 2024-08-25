import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { RedisModule } from '@app/redis';

@Module({
  imports: [
    RedisModule
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
