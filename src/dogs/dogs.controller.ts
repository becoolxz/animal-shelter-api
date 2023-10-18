import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { LoggerService } from '../common/logger/winston_logger.logger';

@Controller('dogs')
export class DogsController {
  private readonly logger: LoggerService;

  constructor(private readonly dogsService: DogsService) {
    this.logger = new LoggerService(DogsController.name);
  }

  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    this.logger.log('[create] - Creating new dog...');
    return this.dogsService.create(createDogDto);
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
    this.logger.log('[findAll]- Searching all dogs...');
    return this.dogsService.findAll(page, limit, order);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    this.logger.log(`[findOne] - Searching dog ID: ${id}...`);
    return this.dogsService.findOne(+id);
  }

  @Patch(':uuid')
  update(
    @Param('uuid')
    uuid: string,
    @Body() updateDogDto: UpdateDogDto,
  ) {
    this.logger.log(`[update] - Updating dog UUID: ${uuid}...`);
    return this.dogsService.update(uuid, updateDogDto);
  }

  @Delete(':uuid')
  remove(
    @Param('uuid')
    uuid: string,
  ) {
    this.logger.log(`[remove] - Removing dog UUID: ${uuid}...`);
    return this.dogsService.remove(uuid);
  }
}
