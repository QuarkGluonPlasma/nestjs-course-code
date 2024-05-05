import { Global, Module } from '@nestjs/common';
import * as Minio from 'minio';

export const MINIO_CLIENT = 'MINIO_CLIENT';

@Global()
@Module({
    providers: [
        {
            provide: MINIO_CLIENT,
            async useFactory() {
                const client = new Minio.Client({
                        endPoint: 'localhost',
                        port: 9000,
                        useSSL: false,
                        accessKey: 'nGRnybVbKtaZsSShwnee',
                        secretKey: 'cV4bAPDGU0NRM3O0FA9mWnR8cxXRnpihh2Akr1pW'
                    })
                return client;
            }
          }
    ],
    exports: [MINIO_CLIENT]
})
export class MinioModule {}