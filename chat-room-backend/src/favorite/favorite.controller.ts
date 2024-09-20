import { Controller, Get, Query } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { RequireLogin, UserInfo } from 'src/custom.decorator';

@Controller('favorite')
@RequireLogin()
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get('list')
  async list(@UserInfo('userId') userId: number) {
    return this.favoriteService.list(userId);
  }

  @Get('add')
  async add(@UserInfo('userId') userId: number, @Query('chatHistoryId') chatHistoryId: number) {
    return this.favoriteService.add(userId, chatHistoryId);
  }

  @Get('del')
  async del(@Query('id') id: number) {
    return this.favoriteService.del(id);
  }
}
