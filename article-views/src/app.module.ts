import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { Article } from './article/entities/article.entity';
import { User } from './user/entities/user.entity';
import { RedisModule } from './redis/redis.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';
import { CdModule } from './users/guang/code/article-views/cd/cd.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "guang",
      database: "article_views",
      synchronize: true,
      logging: true,
      entities: [Article, User],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
          authPlugin: 'sha256_password',
      }
    }),
    UserModule,
    ArticleModule,
    RedisModule,
    TaskModule,
    CdModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
