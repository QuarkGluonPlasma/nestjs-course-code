import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RedisClientType } from 'redis';
import { of, tap } from 'rxjs';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {

  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  @Inject(HttpAdapterHost)
  private httpAdapterHost: HttpAdapterHost;

  async intercept(context: ExecutionContext, next: CallHandler) {
    
    const request = context.switchToHttp().getRequest();

    const key = this.httpAdapterHost.httpAdapter.getRequestUrl(request);

    const value = await this.redisClient.get(key);

    if(!value) {
      return next.handle().pipe(tap((res) => {
        this.redisClient.set(key, res);
      }));
    } else {
      return of(value);
    }    
  }
}
