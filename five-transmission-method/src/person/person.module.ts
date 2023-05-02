import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';

@Module({
  controllers: [PersonController],
  providers: []
})
export class PersonModule {}
