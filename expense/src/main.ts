import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  let port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  /*  app.use(cookieParser()); */
  const config = new DocumentBuilder()
    .setTitle('Budget Book Expense API Documentation')
    .setDescription('Budget Book Expense API description')
    .setVersion('1.0')
    .addTag('budget-book')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
}
bootstrap();
