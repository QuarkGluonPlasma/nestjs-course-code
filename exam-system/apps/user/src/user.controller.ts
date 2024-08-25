import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { RedisService } from '@app/redis';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(RedisService)
  redisService: RedisService;

  @Get()
  async getHello() {
    const keys = await this.redisService.keys('*');
    return this.userService.getHello() +  keys;
  }
}
