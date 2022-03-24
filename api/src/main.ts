import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from '/@/app/app.module';
import { HttpExceptionFilter } from '/@/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = config.get<number>('port');
  await app.listen(port, (): void => {
    Logger.log(`Listening at http://localhost:${port}`, 'Bootstrap');
  });
}
bootstrap();
