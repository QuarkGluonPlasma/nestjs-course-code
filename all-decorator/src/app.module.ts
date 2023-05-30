import { Module } from '@nestjs/common';
import { AaaGuard } from './aaa.guard';
import { AaaInterceptor } from './aaa.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Guang } from './Guang';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';
import { AaaController } from './aaa.controller';

@Module({
  imports: [BbbModule, CccModule],
  controllers: [AppController, AaaController],
  providers: [AppService, Guang, {
    provide: 'Guang',
    useFactory() {
      return {
        name: 'guang'
      }
    }
  }],
})
export class AppModule {}
