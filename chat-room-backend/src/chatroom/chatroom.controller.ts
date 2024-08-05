import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { RequireLogin, UserInfo } from 'src/custom.decorator';

@Controller('chatroom')
@RequireLogin()
export class ChatroomController {
  constructor(private readonly chatroomService: ChatroomService) {}

  @Get('create-one-to-one')
  async oneToOne(@Query('friendId') friendId: number, @UserInfo('userId') userId: number) {
    if(!friendId) {
      throw new BadRequestException('聊天好友的 id 不能为空');
    }
    return this.chatroomService.createOneToOneChatroom(friendId, userId);
  }

  @Get('create-group')
  async group(@Query('name') name: string, @UserInfo('userId') userId: number) {
    return this.chatroomService.createGroupChatroom(name, userId);
  }

  @Get('list')
  async list(@UserInfo('userId') userId: number, @Query('name') name: string) {
    if(!userId) {
      throw new BadRequestException('userId 不能为空')
    }
    return this.chatroomService.list(userId, name);
  }

  @Get('members')
  async members(@Query('chatroomId') chatroomId: number) {
    if(!chatroomId) {
      throw new BadRequestException('chatroomId 不能为空')
    }
    return this.chatroomService.members(chatroomId);
  }

  @Get('info/:id')
  async info(@Param('id') id: number) {
    if(!id) {
      throw new BadRequestException('id 不能为空')
    }
    return this.chatroomService.info(id);
  }

  @Get('join/:id')
  async join(@Param('id') id: number, @Query('joinUsername') joinUsername: string) {
    if(!id) {
      throw new BadRequestException('id 不能为空')
    }
    if(!joinUsername) {
      throw new BadRequestException('joinUsername 不能为空')
    }
    return this.chatroomService.join(id, joinUsername);
  }

  @Get('quit/:id')
  async quit(@Param('id') id: number, @Query('quitUserId') quitUserId: number) {
    if(!id) {
      throw new BadRequestException('id 不能为空')
    }
    if(!quitUserId) {
      throw new BadRequestException('quitUserId 不能为空')
    }
    return this.chatroomService.quit(id, quitUserId);
  }

  @Get('findChatroom')
  async findChatroom(@Query('userId1') userId1: string, @Query('userId2') userId2: string) {
    if(!userId1 || !userId2) {
      throw new BadRequestException('用户 id 不能为空');
    }
    return this.chatroomService.queryOneToOneChatroom(+userId1, +userId2);
  }
}
