import { Module } from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(() => {
      return {
        ddd: 222
      }
    })
  ],
  controllers: [BbbController],
  providers: [BbbService]
})
export class BbbModule {}
