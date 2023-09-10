import { Module } from '@nestjs/common';
import { CustomLogger } from './custom_logger.logger';

@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class CustomLoggerModule {}
