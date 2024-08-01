import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomGateway } from './chatroom.gateway';

@Module({
  providers: [ChatroomGateway, ChatroomService],
})
export class ChatroomModule {}
