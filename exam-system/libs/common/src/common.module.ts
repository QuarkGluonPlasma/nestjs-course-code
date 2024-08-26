import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: 'guang',
          signOptions: {
            expiresIn: '30m' // 默认 30 分钟
          }
        }
      }
    }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
