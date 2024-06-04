import { Module } from '@nestjs/common';
import { GithubStrategy } from './auth.strategy';

@Module({
    providers: [GithubStrategy]
})
export class AuthModule {}
