import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';
import { ResponseDogDto } from './dto/response-dog.dto';
import { Sequelize } from 'sequelize-typescript';
import { AnimalSheltersService } from '../animal-shelters/animal-shelters.service';
import { LoggerService } from '../common/logger/winston_logger.logger';
import { CustomListPaginatedResponse } from '../common/dto/custom-list-paginated-response';

class DogUpdateException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DogUpdateException';
  }
}

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

  async create(createDogDto: CreateDogDto): Promise<ResponseDogDto> {
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
        //dogCreated.id,
        dogCreated.uuid,
        dogCreated.name,
        dogCreated.age,
        dogCreated.breed,
        dogCreated.weight,
        dogCreated.animalShelterId,
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

  async findAll(
    page: number,
    limit: number,
    order: string,
  ): Promise<CustomListPaginatedResponse<ResponseDogDto>> {
    const offset = (page - 1) * limit;
    const dogList = await this.dogsRepository.findAll({
      limit,
      offset,
      order: [[order, 'ASC']],
    });

    const count = await this.dogsRepository.count();
    const itemsPerPage = limit;
    const numPages = count / limit;

    const responseDogDto: ResponseDogDto[] = [];

    dogList.forEach((dog) => {
      responseDogDto.push(ResponseDogDto.convertDogToDto(dog));
    });

    const response = new CustomListPaginatedResponse<ResponseDogDto>(
      count,
      itemsPerPage,
      numPages,
      responseDogDto,
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

  async update(
    uuid: string,
    updateDogDto: UpdateDogDto,
  ): Promise<ResponseDogDto> {
    this.logger.log(`UpdateDog data: ${JSON.stringify(updateDogDto, null, 2)}`);

    try {
      const [affectedCount] = await this.dogsRepository.update(updateDogDto, {
        where: { uuid },
      });

      this.logger.log(`Is dog updated? - affectedCount: ${affectedCount}`);

      const isUpdated = affectedCount > 0;

      if (isUpdated) {
        return new ResponseDogDto(
          uuid,
          updateDogDto.name,
          updateDogDto.age,
          updateDogDto.breed,
          updateDogDto.weight,
          updateDogDto.animalShelterId,
        );
      } else {
        throw new DogUpdateException(
          `Dog with ID ${uuid} not found or not updated.`,
        );
      }
    } catch (error) {
      this.logger.error(`Error updating dog with ID ${uuid}`, error);
      throw error; // Rethrow the error for further handling
    }
  }

  async remove(uuid: string) {
    const affectedCount = await this.dogsRepository.destroy({
      where: { uuid },
    });
    return affectedCount > 0 ? true : false;
  }
}
