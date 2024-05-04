import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { AaaV2Controller } from './aaa-v2.controller';

@Module({
  controllers: [AaaV2Controller, AaaController],
  providers: [AaaService],
})
export class AaaModule {
}
