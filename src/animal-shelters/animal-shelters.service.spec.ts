import { Test, TestingModule } from '@nestjs/testing';
import { AnimalSheltersService } from './animal-shelters.service';

describe('AnimalSheltersService', () => {
  let service: AnimalSheltersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalSheltersService],
    }).compile();

    service = module.get<AnimalSheltersService>(AnimalSheltersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
