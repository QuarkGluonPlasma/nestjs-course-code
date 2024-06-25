import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { GoogleStrategy } from './google.strategy';

@Module({
    imports: [UserModule],
    providers: [LocalStrategy, GoogleStrategy]
})
export class AuthModule {}
