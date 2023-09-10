import { Dog } from './entities/dog.entity';

export const dogsProviders = [
  {
    provide: 'DOGS_REPOSITORY',
    useValue: Dog,
  },
];
