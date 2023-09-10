import { Test, TestingModule } from '@nestjs/testing';
import { AnimalSheltersController } from './animal-shelters.controller';
import { AnimalSheltersService } from './animal-shelters.service';

describe('AnimalSheltersController', () => {
  let controller: AnimalSheltersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalSheltersController],
      providers: [AnimalSheltersService],
    }).compile();

    controller = module.get<AnimalSheltersController>(AnimalSheltersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
