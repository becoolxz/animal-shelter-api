import { NestFactory } from '@nestjs/core';
import generalConfiguration from './common/config/general-configuration';
import { AppModule } from './app.module';
import { CustomLogger } from './common/logger/custom_logger.logger';
import { ValidationPipe } from '@nestjs/common';

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
