import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  })
  await app.listen(3001);
}
bootstrap();
