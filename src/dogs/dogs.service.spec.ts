import { Test, TestingModule } from '@nestjs/testing';
import { DogsService } from './dogs.service';
import { AnimalSheltersService } from '../animal-shelters/animal-shelters.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

const dogsRepositoryMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

const animalShelterServiceMock = {
  findOne: jest.fn().mockReturnValue({}),
};

const sequelizeTransactionMock = {
  commit: jest.fn(),
  rollback: jest.fn(),
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
          useValue: {
            transaction: jest.fn().mockReturnValue(sequelizeTransactionMock),
          },
        },
        {
          provide: AnimalSheltersService,
          useValue: animalShelterServiceMock,
        },
      ],
    }).compile();

    service = module.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a dog', async () => {
      const dogData = {
        uuid: faker.string.uuid(),
        name: faker.person.fullName(),
        breed: faker.animal.dog(),
        age: faker.number.int({ min: 1, max: 10 }),
        weight: faker.number.float({ min: 1, max: 50, precision: 0.1 }),
        animalShelterId: faker.number.int({ min: 1, max: 10 }),
      };

      dogsRepositoryMock.create.mockResolvedValue(dogData);

      const createdDog = await service.create(dogData);

      expect(createdDog).toEqual(dogData);
      expect(dogsRepositoryMock.create).toHaveBeenCalled();
    });
  });
});
