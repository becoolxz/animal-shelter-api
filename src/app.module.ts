import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { UsersModule } from './user/user.module';
import { DogsModule } from './dogs/dogs.module';
import { CustomLoggerModule } from './common/logger/custom_logger.module';
import { ConfigModule } from '@nestjs/config';
import { AnimalSheltersModule } from './animal-shelters/animal-shelters.module';
import generalConfiguration from './common/config/general-configuration';

@Module({
  imports: [
    UsersModule,
    CityModule,
    DogsModule,
    CustomLoggerModule,
    ConfigModule.forRoot({ load: [generalConfiguration] }),
    AnimalSheltersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
