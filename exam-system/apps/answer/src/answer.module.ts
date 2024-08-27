import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '@app/prisma';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, CommonModule } from '@app/common';
import { ExcelModule } from '@app/excel';

@Module({
  imports: [
    PrismaModule,
    CommonModule,
    ExcelModule,
    ClientsModule.register([
      {
        name: 'EXAM_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 8888,
        },
      },
    ])
  ],
  controllers: [AnswerController],
  providers: [AnswerService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AnswerModule {}
