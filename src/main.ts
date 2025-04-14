import * as cookies from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './pipes/custom-pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async () => {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  const PORT = config.get<string>('PORT') || 3030;
  const CLIENT_URL = config.getOrThrow<string>('CLIENT_URL');

  app.use(cookies());

  app.enableCors({
    credentials: true,
    origin: CLIENT_URL
  });

  app.useGlobalPipes(new CustomValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Rulyou API')
    .setDescription('Created by Nest.js')
    .setVersion('1.0')
    .build();

  SwaggerModule.setup('', app, () => {
    return SwaggerModule.createDocument(app, swaggerConfig);
  }, { swaggerOptions: { defaultModelsExpandDepth: -1 } });

  await app.listen(PORT, () => {
    console.log('Server running on port:', PORT);
  });
})();
