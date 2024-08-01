import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';

@Module({
  controllers: [ChatroomController],
  providers: [ChatroomService],
})
export class ChatroomModule {}
