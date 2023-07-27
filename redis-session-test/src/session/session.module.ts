import { Global, Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { SessionService } from './session.service';

@Global()
@Module({
  providers: [SessionService],
  exports: [SessionService]
})
export class SessionModule {}
