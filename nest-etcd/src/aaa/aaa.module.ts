import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { EtcdModule } from 'src/etcd/etcd.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // EtcdModule.forRoot({
    //     hosts: 'http://localhost:2379',
    //     auth: {
    //         username: 'root',
    //         password: 'guang'
    //     }
    // })
    EtcdModule.forRootAsync({
      async useFactory(configService: ConfigService) {
          await 111;
          return {
              hosts: configService.get('etcd_hosts'),
              auth: {
                  username: configService.get('etcd_auth_username'),
                  password: configService.get('etcd_auth_password')
              }
          }
      },
      inject: [ConfigService]
    })
  ],
  controllers: [AaaController],
  providers: [
    AaaService
  ],
})
export class AaaModule {}
