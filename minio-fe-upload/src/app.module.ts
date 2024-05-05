import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [MinioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
