import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // config for corrent work env variables
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(4444);
}
bootstrap();
