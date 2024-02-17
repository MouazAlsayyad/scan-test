import { NestFactory } from '@nestjs/core';
import { Microservice3Module } from './microservice-3.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(Microservice3Module);
  app.connectMicroservice(Microservice3Module);
  await app.startAllMicroservices();
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
