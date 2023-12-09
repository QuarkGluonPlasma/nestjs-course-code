import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Etcd3 } from 'etcd3';
import { EtcdModule } from './etcd/etcd.module';
import { AaaModule } from './aaa/aaa.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EtcdModule,
    AaaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env'
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'ETCD_CLIENT',
      useFactory() {
        const client = new Etcd3({
            hosts: 'http://localhost:2379',
            auth: {
                username: 'root',
                password: 'guang'
            }
        });
        return client;
      }
    }
  ],
})
export class AppModule {}
