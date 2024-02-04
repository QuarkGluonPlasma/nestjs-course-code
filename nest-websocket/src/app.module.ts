import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';

@Module({
  imports: [AaaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
