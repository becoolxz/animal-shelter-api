import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AnimalSheltersService } from './animal-shelters.service';
import { CreateAnimalShelterDto } from './dto/create-animal-shelter.dto';
import { UpdateAnimalShelterDto } from './dto/update-animal-shelter.dto';
import { LoggerService } from '../common/logger/winston_logger.logger';

@Controller('animal-shelters')
export class AnimalSheltersController {
  private readonly logger: LoggerService;

  constructor(private readonly animalSheltersService: AnimalSheltersService) {
    this.logger = new LoggerService(AnimalSheltersController.name);
  }

  @Post()
  create(@Body() createAnimalShelterDto: CreateAnimalShelterDto) {
    this.logger.log('[create] - Creating new animal shelter...');
    return this.animalSheltersService.create(createAnimalShelterDto);
  }

  @Get()
  findAll(
    @Query('page')
    page: number = 1,
    @Query('limit')
    limit: number = 10,
    @Query('order')
    order: string = 'id',
  ) {
    this.logger.log('[findAll]- Searching all animal shelter...');
    return this.animalSheltersService.findAll(page, limit, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalSheltersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnimalShelterDto: UpdateAnimalShelterDto,
  ) {
    return this.animalSheltersService.update(+id, updateAnimalShelterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalSheltersService.remove(+id);
  }
}
