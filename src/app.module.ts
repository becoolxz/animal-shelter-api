import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CustomLoggerModule } from './common/logger/custom_logger.module';
import generalConfiguration from './common/config/general-configuration';
import { DogsModule } from './dogs/dogs.module';
import { AnimalSheltersModule } from './animal-shelters/animal-shelters.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ load: [generalConfiguration] }),
    CustomLoggerModule,
    AnimalSheltersModule,
    DogsModule,
  ],
})
export class AppModule {}
