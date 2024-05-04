import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const extractor = (request: Request)=> {
    if(request.headers['disable-custom']) {
      return [];
    }
    return request.url.includes('guang') ? '2' : '1';
  }

  app.enableVersioning({
    // type: VersioningType.HEADER,
    // header: 'version'
    // type: VersioningType.MEDIA_TYPE,
    // key: 'vv='
    // type: VersioningType.URI
    type: VersioningType.CUSTOM,
    extractor
  })

  await app.listen(3000);
}

bootstrap();
