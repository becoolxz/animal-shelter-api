import { Inject, Injectable } from '@nestjs/common';
import { CreateAnimalShelterDto } from './dto/create-animal-shelter.dto';
import { UpdateAnimalShelterDto } from './dto/update-animal-shelter.dto';
import { AnimalShelter } from './entities/animal-shelter.entity';
import { ResponseAnimalShelterDto } from './dto/response-animal-shelter.dto';

@Injectable()
export class AnimalSheltersService {
  constructor(
    @Inject('ANIMAL_SHELTERS_REPOSITORY')
    private animalSheltersRepository: typeof AnimalShelter,
  ) {}

  async create(createAnimalShelterDto: CreateAnimalShelterDto) {
    const animalShelterCreated = await this.animalSheltersRepository.create({
      name: createAnimalShelterDto.name,
      address: createAnimalShelterDto.address,
    });

    return new ResponseAnimalShelterDto(
      animalShelterCreated.id,
      animalShelterCreated.name,
      animalShelterCreated.address,
    );
  }

  findAll() {
    return this.animalSheltersRepository.findAll();
  }

  findOne(id: number) {
    return this.animalSheltersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAnimalShelterDto: UpdateAnimalShelterDto) {
    const updateDog = new AnimalShelter({
      name: updateAnimalShelterDto.name,
      address: updateAnimalShelterDto.address,
    });

    const [affectedCount] = await this.animalSheltersRepository.update(
      { updateDog },
      { where: { id } },
    );

    return affectedCount > 0 ? true : false;
  }

  async remove(id: number) {
    const affectedCount = await this.animalSheltersRepository.destroy({
      where: { id },
    });
    return affectedCount > 0 ? true : false;
  }
}
