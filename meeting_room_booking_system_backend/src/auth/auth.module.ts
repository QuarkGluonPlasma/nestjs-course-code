import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [UserModule],
    providers: [LocalStrategy]  
})
export class AuthModule {}
