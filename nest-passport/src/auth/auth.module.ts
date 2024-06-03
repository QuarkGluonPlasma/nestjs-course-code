import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './JwtAuthGuard';

@Module({
  imports: [UserModule],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard]
})
export class AuthModule {}
