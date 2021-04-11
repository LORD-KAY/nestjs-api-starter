import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(compression());
  app.set('trust proxy', true);
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 300,
    }),
  );
  app.use('/static/uploads', express.static('uploads'));
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle('Kairos SMS API Documentation')
    .setDescription('Full documentation for the kairos sms api implementation')
    .addTag('kairos-sms')
    .setVersion('1.0')
    .setContact(
      'Acheampong Lord Offei',
      'https://about.me/offeilord',
      'offeilord@gmail.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('APP_PORT') || 3070);
}
bootstrap();
