import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { MyLogger3 } from './MyLogger3';
@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [AppService, MyLogger3],
})
export class AppModule {}
