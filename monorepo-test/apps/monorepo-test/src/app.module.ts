import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Lib1Module } from '@app/lib1';

@Module({
  imports: [
    Lib1Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
