import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer la validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Activer CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Préfixe global pour les routes API
  app.setGlobalPrefix('api');

  await app.listen(3001);
  console.log('🚀 Backend is running on http://localhost:3001');
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
