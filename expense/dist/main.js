"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
async function bootstrap() {
    let port = process.env.PORT || 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Budget Book Expense API Documentation')
        .setDescription('Budget Book Expense API description')
        .setVersion('1.0')
        .addTag('budget-book')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map