import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';

import { DatabaseModule } from '../common/provider/database/database.module';
import { dogsProviders } from './dogs.providers';
import { AnimalSheltersModule } from '../animal-shelters/animal-shelters.module';

@Module({
  imports: [DatabaseModule, AnimalSheltersModule],
  controllers: [DogsController],
  providers: [DogsService, ...dogsProviders],
})
export class DogsModule {}
