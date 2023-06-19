import { Controller, Get, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  @Get()
  async getHello() {
    const keys = await this.redisClient.keys('*');
    console.log(keys);

    return this.appService.getHello();
  }
}
