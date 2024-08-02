import { Inject, Injectable } from '@nestjs/common';
import { ChatHistory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export type HistoryDto = Pick<ChatHistory, 'chatroomId' | 'senderId' | 'type' | 'content'>;

@Injectable()
export class ChatHistoryService {
    @Inject(PrismaService)
    private prismaService: PrismaService;

    async list(chatroomId: number) {
        return this.prismaService.chatHistory.findMany({
            where: {
                chatroomId
            }
        });
    }

    async add(chatroomId: number, history: HistoryDto) {
        return this.prismaService.chatHistory.create({
            data: history
        });
    }

}
