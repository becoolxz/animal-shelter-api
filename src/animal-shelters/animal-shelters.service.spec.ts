import { Test, TestingModule } from '@nestjs/testing';
import { AnimalSheltersService } from './animal-shelters.service';

const animalSheltersRepositoryMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

describe('AnimalSheltersService', () => {
  let service: AnimalSheltersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalSheltersService,
        {
          provide: 'ANIMAL_SHELTERS_REPOSITORY',
          useValue: animalSheltersRepositoryMock, // Use the mock repository
        },
      ],
    }).compile();

    service = module.get<AnimalSheltersService>(AnimalSheltersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
