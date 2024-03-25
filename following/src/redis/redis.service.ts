import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {

    @Inject('REDIS_CLIENT') 
    private redisClient: RedisClientType;

    async sAdd(key: string, ...members: string[]) {
        return this.redisClient.sAdd(key, members);
    }

    async sInterStore(newSetKey: string, set1: string, set2: string) {
        return this.redisClient.sInterStore(newSetKey, [set1, set2]);
    }

    async sIsMember(key: string, member: string) {
        return this.redisClient.sIsMember(key, member);
    }

    async sMember(key: string) {
        return this.redisClient.sMembers(key);
    }

    async exists(key: string) {
        const result =  await this.redisClient.exists(key);
        return result > 0
    } 
}