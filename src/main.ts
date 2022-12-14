import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.enableCors();
  ///** This config is for custom validate => Find("Custom Validate") */
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(5000);
}
bootstrap();
