import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { ResponseDogDto } from './dto/response-dog.dto';
import { CustomListPaginatedResponse } from '../../src/common/dto/custom-list-paginated-response';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

describe('DogsController', () => {
  let controller: DogsController;
  let dogsService: DogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [
        {
          provide: DogsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DogsController>(DogsController);
    dogsService = module.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of dogs', async () => {
      const page = 1;
      const limit = 10;
      const order = 'id';
      const dogsList: CustomListPaginatedResponse<ResponseDogDto> = {
        count: 2,
        num_pages: 1,
        items_per_page: 10,
        results: [],
      };

      for (let i = 0; i < 2; i++) {
        dogsList.results.push({
          name: faker.person.fullName(),
          breed: faker.animal.dog(),
          age: faker.number.int({ min: 1, max: 10 }),
          weight: faker.number.float({ min: 1, max: 50, precision: 0.1 }),
          animalShelterId: faker.number.int({ min: 1, max: 10 }),
          uuid: faker.string.uuid(),
        });
      }

      (dogsService.findAll as jest.Mock).mockResolvedValue(dogsList);

      // Call the controller method
      const result = await controller.findAll(page, limit, order);

      // Assertions
      expect(result).toEqual(dogsList); // Check if the result matches the mocked response
      expect(dogsService.findAll).toHaveBeenCalledWith(page, limit, order); // Check if the service method was called with the correct arguments
    });
  });

  describe('create', () => {
    it('should create a new dog', async () => {
      const createDogDto: CreateDogDto = {
        name: faker.person.fullName(),
        breed: faker.animal.dog(),
        age: faker.number.int({ min: 1, max: 10 }),
        weight: faker.number.float({ min: 1, max: 50, precision: 0.1 }),
        animalShelterId: faker.number.int({ min: 1, max: 10 }),
      };

      (dogsService.create as jest.Mock).mockResolvedValue(createDogDto);

      const result = await controller.create(createDogDto);

      const responseCreatedDog: ResponseDogDto = {
        uuid: result.uuid,
        name: result.name,
        breed: result.breed,
        age: result.age,
        weight: result.weight,
        animalShelterId: result.animalShelterId,
      };

      expect(result).toEqual(responseCreatedDog);
      expect(dogsService.create).toHaveBeenCalledWith(createDogDto);
    });
  });

  describe('update', () => {
    it('should update a dog', async () => {
      const uuid = faker.string.uuid();
      const updateDogDto = {
        name: faker.person.fullName(),
        breed: faker.animal.dog(),
        age: faker.number.int({ min: 1, max: 10 }),
        weight: faker.number.float({ min: 1, max: 50, precision: 0.1 }),
        animalShelterId: faker.number.int({ min: 1, max: 10 }),
      };

      (dogsService.update as jest.Mock).mockResolvedValue({
        uuid,
        ...updateDogDto,
      });

      const responseUpdatedDog: ResponseDogDto = {
        uuid,
        name: updateDogDto.name,
        breed: updateDogDto.breed,
        age: updateDogDto.age,
        weight: updateDogDto.weight,
        animalShelterId: updateDogDto.animalShelterId,
      };

      const result = await controller.update(uuid, updateDogDto);

      expect(result).toEqual({
        uuid,
        ...responseUpdatedDog,
      });

      expect(dogsService.update).toHaveBeenCalledWith(uuid, updateDogDto);
    });
  });

  describe('delete', () => {
    it('should delete a dog by UUID', async () => {
      const uuid = faker.string.uuid();

      (dogsService.remove as jest.Mock).mockResolvedValue({
        success: true,
      });

      const result = await controller.remove(uuid);

      expect(result).toEqual({
        success: true,
      });

      expect(dogsService.remove).toHaveBeenCalledWith(uuid);
    });
  });
});
