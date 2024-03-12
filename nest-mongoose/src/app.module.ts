import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DogModule } from './dog/dog.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/guang'),
    DogModule
      
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
