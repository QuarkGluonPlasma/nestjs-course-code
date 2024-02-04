import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaGateway } from './aaa.gateway';

@Module({
  providers: [AaaGateway, AaaService],
})
export class AaaModule {}
