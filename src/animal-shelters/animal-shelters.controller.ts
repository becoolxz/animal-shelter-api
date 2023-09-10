import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimalSheltersService } from './animal-shelters.service';
import { CreateAnimalShelterDto } from './dto/create-animal-shelter.dto';
import { UpdateAnimalShelterDto } from './dto/update-animal-shelter.dto';

@Controller('animal-shelters')
export class AnimalSheltersController {
  constructor(private readonly animalSheltersService: AnimalSheltersService) {}

  @Post()
  create(@Body() createAnimalShelterDto: CreateAnimalShelterDto) {
    return this.animalSheltersService.create(createAnimalShelterDto);
  }

  @Get()
  findAll() {
    return this.animalSheltersService.findAll();
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
