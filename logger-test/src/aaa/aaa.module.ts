import { Module } from '@nestjs/common';
import { Logger2Module } from 'src/logger2/logger.module';

@Module({
    imports: [
        Logger2Module.register({xxx: 1, yyy: 2})
    ]
})
export class AaaModule {}
