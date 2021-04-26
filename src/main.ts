import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from 'config';

async function bootstrap() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  const app = await NestFactory.create(AppModule, { cors: true });

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Users api')
      .setDescription('Users microservice')
      .setVersion('1.0')
      .build()
  );
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(config.port);
}
bootstrap();
