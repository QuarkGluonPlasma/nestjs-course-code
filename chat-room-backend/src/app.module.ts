import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { FriendshipModule } from './friendship/friendship.module';
import { ChatroomModule } from './chatroom/chatroom.module';
import { MinioModule } from './minio/minio.module';
import { ChatModule } from './chat/chat.module';
import { ChatHistoryModule } from './chat-history/chat-history.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    UserModule, 
    PrismaModule, 
    RedisModule, 
    EmailModule,
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: 'guang',
          signOptions: {
            expiresIn: '30m' // 默认 30 分钟
          }
        }
      }
    }),
    FriendshipModule,
    ChatroomModule,
    MinioModule,
    ChatModule,
    ChatHistoryModule,
    FavoriteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    PrismaService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
