import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
app.enableCors({
  origin: 'http://localhost:3000',
});

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');
  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);
  const origin = `http://127.0.0.1:${port}`;
  Logger.log(`Listening at ${origin}`, 'Bootstrap');
  Logger.log(`POST ${origin}/api/users/register`, 'Register');
}
bootstrap();
