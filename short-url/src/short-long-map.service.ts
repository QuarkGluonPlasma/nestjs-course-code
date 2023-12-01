import { UniqueCodeService } from './unique-code.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ShortLongMap } from './entities/ShortLongMap';
import { UniqueCode } from './entities/UniqueCode';

@Injectable()
export class ShortLongMapService {

    @InjectEntityManager()
    private entityManager: EntityManager;

    @Inject(UniqueCodeService)
    private uniqueCodeService: UniqueCodeService;

    async getLongUrl(code: string) {
        const map = await this.entityManager.findOneBy(ShortLongMap, {
            shortUrl: code
        });
        if(!map) {
            return null;
        }
        return map.longUrl;
    }


    async generate(longUrl: string) {
        let uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
            status: 0
        })

        if(!uniqueCode) {
            uniqueCode = await this.uniqueCodeService.generateCode();
        }
        const map = new ShortLongMap();
        map.shortUrl = uniqueCode.code;
        map.longUrl = longUrl;

        
        await this.entityManager.insert(ShortLongMap, map);
        await this.entityManager.update(UniqueCode, {
            id: uniqueCode.id
        }, {
            status: 1
        });
        return uniqueCode.code;
    }

}
