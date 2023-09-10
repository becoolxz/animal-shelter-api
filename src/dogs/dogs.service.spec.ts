import { Test, TestingModule } from '@nestjs/testing';
import { DogsService } from './dogs.service';
import { AnimalSheltersService } from '../animal-shelters/animal-shelters.service';

const dogsRepositoryMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

describe('DogsService', () => {
  let service: DogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DogsService,
        {
          provide: 'DOGS_REPOSITORY',
          useValue: dogsRepositoryMock, // Use the mock repository
        },
        {
          provide: 'SEQUELIZE',
          useValue: {},
        },
        {
          provide: AnimalSheltersService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
