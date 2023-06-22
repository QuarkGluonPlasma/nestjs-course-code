import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule
  ],
  controllers: [AaaController],
  providers: [AaaService]
})
export class AaaModule {}
