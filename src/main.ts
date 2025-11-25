import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth/guards/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.enableCors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })

  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new AuthGuard(jwtService, reflector)) 

  await app.listen(process.env.PORT ?? 3000);

  useContainer(app.select(AppModule), {
    fallbackOnErrors: true
  })
}
bootstrap();
