import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*  app.setGlobalPrefix('api'); */
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
