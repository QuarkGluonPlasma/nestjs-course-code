import { Controller, Get, Query, Res } from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';

@Controller('chat-history')
export class ChatHistoryController {
  constructor(private readonly chatHistoryService: ChatHistoryService) {}

  @Get('list')
  async list(@Query('chatroomId') chatroomId: string) {
    return this.chatHistoryService.list(+chatroomId);
  }
}
