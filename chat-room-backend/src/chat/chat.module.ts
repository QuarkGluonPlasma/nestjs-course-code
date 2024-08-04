import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatHistoryModule } from 'src/chat-history/chat-history.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ChatHistoryModule, UserModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
