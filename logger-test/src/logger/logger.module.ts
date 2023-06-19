import {  Global, Module } from '@nestjs/common';
import { Logger2Module } from 'src/logger2/logger.module';
import { MyLogger } from 'src/MyLogger';

@Global()
@Module({
    providers: [MyLogger],
    exports: [MyLogger]
})
export class LoggerModule{}
