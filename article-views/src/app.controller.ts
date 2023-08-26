import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Article } from './article/entities/article.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @InjectEntityManager()
  private entityManager: EntityManager;

  @Get('init-data')
  async initData() {
    await this.entityManager.save(User, {
      username: 'dong',
      password: '111111'
    });
    await this.entityManager.save(User, {
      username: 'guang',
      password: '222222'
    });

    await this.entityManager.save(Article, {
      title: '基于 Axios 封装一个完美的双 token 无感刷新',
      content: `用户登录之后，会返回一个用户的标识，之后带上这个标识请求别的接口，就能识别出该用户。

      标识登录状态的方案有两种： session 和 jwt。
      `
    });

    await this.entityManager.save(Article, {
      title: 'Three.js 手写跳一跳小游戏',
      content: `前几年，跳一跳小游戏火过一段时间。

      玩家从一个方块跳到下一个方块，如果没跳过去就算失败，跳过去了就会再出现下一个方块。`
    });
    return 'done';
  }
}
