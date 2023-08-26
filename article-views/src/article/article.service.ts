import { RedisService } from './../redis/redis.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findAll() {
    return `This action returns all article`;
  }

  @InjectEntityManager()
  private entityManager: EntityManager;

  async findOne(id: number) {
    return await this.entityManager.findOneBy(Article, {
      id
    });
  }

  @Inject(RedisService)
  private redisService: RedisService;

  async view(id: number, userId: string) {
    const res = await this.redisService.hashGet(`article_${id}`);


    if(res.viewCount === undefined) {
      const article = await this.findOne(id);
      
      article.viewCount ++;

      await this.entityManager.update(Article, {  id }, {
        viewCount: article.viewCount
      });

      await this.redisService.hashSet(`article_${id}`, {
        viewCount: article.viewCount,
        likeCount: article.likeCount,
        collectCount: article.collectCount
      });

      await this.redisService.set(`user_${userId}_article_${id}`, 1, 3);


      return article.viewCount;

    } else {
      const flag = await this.redisService.get(`user_${userId}_article_${id}`);

      if(flag) {
        return res.viewCount;
      }

      await this.redisService.hashSet(`article_${id}`, {
        ...res,
        viewCount: +res.viewCount + 1
      });

      await this.redisService.set(`user_${userId}_article_${id}`, 1, 3);

      return +res.viewCount + 1;
    }
  }

  async flushRedisToDB() {
    const keys = await this.redisService.keys(`article_*`);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      
      const res = await this.redisService.hashGet(key);

      const [, id] = key.split('_');

      await this.entityManager.update(Article, {
        id: +id
      }, {
        viewCount: +res.viewCount,        
      });
    }
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
