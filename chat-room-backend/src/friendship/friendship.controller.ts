import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendAddDto } from './dto/friend-add.dto';
import { RequireLogin, UserInfo } from 'src/custom.decorator';

@Controller('friendship')
@RequireLogin()
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post('add')
  async add(@Body() friendAddDto: FriendAddDto, @UserInfo("userId") userId: number) {
    return this.friendshipService.add(friendAddDto, userId);
  }

  @Get('request_list')
  async list(@UserInfo("userId") userId: number) {
    return this.friendshipService.list(userId);
  }

  @Get('agree/:id')
  async agree(@Param('id') friendId: number, @UserInfo("userId") userId: number) {
    if(!friendId) {
      throw new BadRequestException('添加的好友 id 不能为空');
    }
    return this.friendshipService.agree(friendId, userId);
  }

  @Get('reject/:id')
  async reject(@Param('id') friendId: number, @UserInfo("userId") userId: number) {
    if(!friendId) {
      throw new BadRequestException('添加的好友 id 不能为空');
    }
    return this.friendshipService.reject(friendId, userId);
  }

  @Get('list')
  async friendship(@UserInfo('userId') userId: number, @Query('name') name: string) {
    return this.friendshipService.getFriendship(userId, name);
  }

  @Get('remove/:id')
  async remove(@Param('id') friendId: number, @UserInfo('userId') userId: number) {
    return this.friendshipService.remove(friendId, userId);
  }
}
