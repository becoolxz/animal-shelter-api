import { AnimalShelter } from './entities/animal-shelter.entity';

export const animalSheltersProviders = [
  {
    provide: 'ANIMAL_SHELTERS_REPOSITORY',
    useValue: AnimalShelter,
  },
];
