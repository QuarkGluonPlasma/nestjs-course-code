import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomGateway } from './chatroom.gateway';
import { ChatroomService } from './chatroom.service';

describe('ChatroomGateway', () => {
  let gateway: ChatroomGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatroomGateway, ChatroomService],
    }).compile();

    gateway = module.get<ChatroomGateway>(ChatroomGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
