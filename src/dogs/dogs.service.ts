import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';
import { ResponseDogDto } from './dto/response-dog.dto';
import { Sequelize } from 'sequelize-typescript';
import { AnimalSheltersService } from '../animal-shelters/animal-shelters.service';
import { LoggerService } from '../common/logger/winston_logger.logger';
import { CustomListPaginatedResponse } from '../common/dto/custom-list-paginated-response';

@Injectable()
export class DogsService {
  private readonly logger: LoggerService;

  constructor(
    @Inject('DOGS_REPOSITORY')
    private dogsRepository: typeof Dog,

    @Inject('SEQUELIZE')
    private sequelize: Sequelize,

    private readonly animalShelterService: AnimalSheltersService,
  ) {
    this.logger = new LoggerService(DogsService.name);
  }

  async create(createDogDto: CreateDogDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const foundAnimalShelter = await this.animalShelterService.findOne(
        createDogDto.animalShelterId,
      );

      this.logger.log(
        `Found Animal Shelter: ${JSON.stringify(foundAnimalShelter, null, 2)}`,
      );

      if (!foundAnimalShelter) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Animal shelter not found with ID: ${createDogDto.animalShelterId}`,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const dogCreated = await this.dogsRepository.create(
        {
          name: createDogDto.name,
          age: createDogDto.age,
          breed: createDogDto.breed,
          weight: createDogDto.weight,
          animalShelterId: createDogDto.animalShelterId,
        },
        { transaction }, // Pass the transaction object
      );

      await transaction.commit(); // Commit the transaction

      this.logger.log(`Dog created: ${JSON.stringify(dogCreated, null, 2)}`);

      return new ResponseDogDto(
        dogCreated.id,
        dogCreated.name,
        dogCreated.age,
        dogCreated.breed,
        dogCreated.weight,
      );
    } catch (error) {
      this.logger.warn(
        `There wasn't possible create a this dog in the database: ${JSON.stringify(
          createDogDto,
          null,
          2,
        )}`,
      );
      await transaction.rollback(); // Rollback the transaction on error
      throw error;
    }
  }

  async findAll(page, limit, order): Promise<CustomListPaginatedResponse<Dog>> {
    const offset = (page - 1) * limit;
    const dogList = await this.dogsRepository.findAll({
      limit,
      offset,
      order: [[order, 'ASC']],
    });

    const count = await this.dogsRepository.count();
    const itemsPerPage = limit;
    const numPages = count / limit;

    const response = new CustomListPaginatedResponse<Dog>(
      count,
      itemsPerPage,
      numPages,
      dogList,
    );

    return response;
  }

  async findOne(id: number) {
    this.logger.log(`Find Dog with ID: ${id}`);

    const foundDog = await this.dogsRepository.findOne({ where: { id } });

    if (!foundDog) {
      this.logger.warn(`Dog not found with ID: ${id}`);

      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Dog not found with ID: ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return foundDog;
  }

  async update(id: number, updateDogDto: UpdateDogDto) {
    this.logger.log(`UpdateDog data: ${JSON.stringify(updateDogDto, null, 2)}`);

    try {
      const [affectedCount] = await this.dogsRepository.update(updateDogDto, {
        where: { id },
      });

      this.logger.log(`Is dog updated? - affectedCount: ${affectedCount}`);

      return affectedCount > 0; // Directly return the boolean condition
    } catch (error) {
      this.logger.error(`Error updating dog with ID ${id}`, error);
      throw error; // Rethrow the error for further handling
    }
  }

  async remove(id: number) {
    const affectedCount = await this.dogsRepository.destroy({ where: { id } });
    return affectedCount > 0 ? true : false;
  }
}
