import { Module } from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';
import { ChatHistoryController } from './chat-history.controller';

@Module({
  controllers: [ChatHistoryController],
  providers: [ChatHistoryService],
  exports: [ChatHistoryService],
})
export class ChatHistoryModule {}
