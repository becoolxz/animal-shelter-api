import { Inject, Injectable } from '@nestjs/common';
import { CreateAnimalShelterDto } from './dto/create-animal-shelter.dto';
import { UpdateAnimalShelterDto } from './dto/update-animal-shelter.dto';
import { AnimalShelter } from './entities/animal-shelter.entity';
import { ResponseAnimalShelterDto } from './dto/response-animal-shelter.dto';
import { CustomListPaginatedResponse } from '../common/dto/custom-list-paginated-response';

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

  async findAll(page: number, limit: number, order: string) {
    const offset = (page - 1) * limit;
    const animalShelterList = await this.animalSheltersRepository.findAll({
      limit,
      offset,
      order: [[order, 'ASC']],
    });

    const count = await this.animalSheltersRepository.count();
    const itemsPerPage = limit;
    const numPages = count / limit;

    const response = new CustomListPaginatedResponse<AnimalShelter>(
      count,
      itemsPerPage,
      numPages,
      animalShelterList,
    );

    return response;
  }

  findOne(id: number) {
    return this.animalSheltersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAnimalShelterDto: UpdateAnimalShelterDto) {
    const updateAnimalShelter = new AnimalShelter({
      name: updateAnimalShelterDto.name,
      address: updateAnimalShelterDto.address,
    });

    const [affectedCount] = await this.animalSheltersRepository.update(
      { updateAnimalShelter },
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
