import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
/* import cookieParser from "cookie-parser"; */
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.setGlobalPrefix('api');
  app.enableCors();
 /*  app.use(cookieParser()); */
  await app.listen(3000);
}
bootstrap();
