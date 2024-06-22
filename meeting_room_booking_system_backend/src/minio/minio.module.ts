import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { MinioController } from './minio.controller';

@Global()
@Module({
    providers: [
        {
            provide: 'MINIO_CLIENT',
            async useFactory(configService: ConfigService) {
                const client = new Minio.Client({
                    endPoint: configService.get('minio_endpoint'),
                    port: +configService.get('minio_port'),
                    useSSL: false,
                    accessKey: configService.get('minio_access_key'),
                    secretKey: configService.get('minio_secret_key')
                })
                return client;
            },
            inject: [ConfigService]
          },
    ],
    controllers: [MinioController],
    exports: ['MINIO_CLIENT']
})
export class MinioModule {}