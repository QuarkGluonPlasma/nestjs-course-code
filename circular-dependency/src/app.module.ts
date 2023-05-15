import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { DddService } from './ddd.service';
import { CccService } from './ccc.service';

@Module({
  imports: [BbbModule, AaaModule],
  controllers: [AppController],
  providers: [AppService, DddService, CccService],
})
export class AppModule {}
