import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './common/logger/custom_logger.logger';

import { ValidationPipe } from '@nestjs/common';
import generalConfiguration from './common/config/general-configuration';

async function bootstrap() {
  const configs = generalConfiguration();
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  app.useLogger(app.get(CustomLogger));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configs.port);
}
bootstrap();
