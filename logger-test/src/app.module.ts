import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyLogger3 } from './MyLogger3';
import { LoggerModule } from './logger/logger.module';
import { AaaModule } from './aaa/aaa.module';

@Module({
  imports: [LoggerModule, AaaModule],
  controllers: [AppController],
  providers: [AppService, MyLogger3],
})
export class AppModule {}
