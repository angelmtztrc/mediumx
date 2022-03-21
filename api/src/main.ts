import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from '/@/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const port = config.get<number>('port');
  await app.listen(port, (): void => {
    Logger.log(`Listening at http://localhost:${port}`, 'Bootstrap');
  });
}
bootstrap();
