import { Module } from '@nestjs/common';
import { AaaGuard } from './aaa.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
