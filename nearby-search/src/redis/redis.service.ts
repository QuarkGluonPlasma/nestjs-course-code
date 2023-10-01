import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {

    @Inject('REDIS_CLIENT') 
    private redisClient: RedisClientType;

    async geoAdd(key: string, posName: string, posLoc: [number, number]) {
        return await this.redisClient.geoAdd(key, {
            longitude: posLoc[0],
            latitude: posLoc[1],
            member: posName
        })
    }

    async geoPos(key: string, posName: string) {
        const res = await this.redisClient.geoPos(key, posName);

        return {
            name: posName,
            longitude: res[0].longitude,
            latitude: res[0].latitude
        }
    }

    async geoList(key: string) {
        const positions = await this.redisClient.zRange(key, 0, -1);

        const list = [];
        for(let i = 0; i < positions.length; i++) {
            const pos = positions[i];
            const res = await this.geoPos(key, pos);
            list.push(res);
        }
        return list;
    }

    async geoSearch(key: string, pos: [number, number], radius: number) {
        const positions = await this.redisClient.geoRadius(key, {
            longitude: pos[0],
            latitude: pos[1]
        }, radius, 'km');
        
        const list = [];
        for(let i = 0; i < positions.length; i++) {
            const pos = positions[i];
            const res = await this.geoPos(key, pos);
            list.push(res);
        }
        return list;
    }
}