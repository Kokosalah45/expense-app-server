import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path/win32';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';
import { ZodValidationPipe } from 'nestjs-zod';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ZodValidationPipe());
  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  const config = new DocumentBuilder()
    .setTitle('Expense App Api')
    .setDescription('Expense App Endpoints')
    .setVersion('1.0')
    .addTag('Expenses')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
