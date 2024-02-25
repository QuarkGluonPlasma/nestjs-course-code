import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';

@Module({
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
