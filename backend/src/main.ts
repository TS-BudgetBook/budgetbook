import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  /*  app.use(cookieParser()); */
  const config = new DocumentBuilder()
    .setTitle('Budget Book API Documentation')
    .setDescription('Budget Book API description')
    .setVersion('1.0')
    .addTag('budget-book')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
