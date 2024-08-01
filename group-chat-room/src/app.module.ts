import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatroomModule } from './chatroom/chatroom.module';

@Module({
  imports: [ChatroomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
