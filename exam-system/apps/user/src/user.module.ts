import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RedisModule } from '@app/redis';

@Module({
  imports: [
    RedisModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
