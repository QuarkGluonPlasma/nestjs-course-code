import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER } from '@nestjs/core';
import { HelloFilter } from './hello.filter';
import { UnloginFilter } from './unlogin.filter';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HelloFilter
    },
    {
      provide: APP_FILTER,
      useClass: UnloginFilter
    }
  ],
})
export class AppModule {}
