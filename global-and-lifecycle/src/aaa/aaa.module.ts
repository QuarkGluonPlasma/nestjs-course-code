import { Module, Global } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';

@Global()
@Module({
  controllers: [AaaController],
  providers: [AaaService],
  exports: [AaaService]
})
export class AaaModule {}
