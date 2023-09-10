import { Module } from '@nestjs/common';
import { AnimalSheltersService } from './animal-shelters.service';
import { AnimalSheltersController } from './animal-shelters.controller';
import { animalSheltersProviders } from './animal-shelters.providers';

@Module({
  controllers: [AnimalSheltersController],
  providers: [AnimalSheltersService, ...animalSheltersProviders],
  exports: [AnimalSheltersService],
})
export class AnimalSheltersModule {}
