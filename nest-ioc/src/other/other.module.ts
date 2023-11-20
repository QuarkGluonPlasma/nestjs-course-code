import { Module } from '@nestjs/common';
import { OtherService } from './other.service';

@Module({
  providers: [OtherService],
  exports: [OtherService]
})
export class OtherModule {}
