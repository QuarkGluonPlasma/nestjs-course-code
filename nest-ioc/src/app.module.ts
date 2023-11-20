import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OtherModule } from './other/other.module';

@Module({
  imports: [OtherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
