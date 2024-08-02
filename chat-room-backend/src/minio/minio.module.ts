import { Global, Module } from '@nestjs/common';
import { MinioController } from './minio.controller';
import * as Minio from 'minio';

@Global()
@Module({
    providers: [
        {
            provide: 'MINIO_CLIENT',
            async useFactory() {
                const client = new Minio.Client({
                        endPoint: 'localhost',
                        port: 9000,
                        useSSL: false,
                        accessKey: '2Dby02mwgiYZ53HfxqdF',
                        secretKey: 'lpRC0lMDAtYTBieut43zYm5OscJkD0m05r0yVFqS'
                    })
                return client;
            }
          }
    ],
    exports: ['MINIO_CLIENT'],
    controllers: [MinioController]
})
export class MinioModule {}