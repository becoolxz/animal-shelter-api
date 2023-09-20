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

  @Get('/hello')
  hello() {
    return 'Hello world';
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

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateDogDto: UpdateDogDto,
  ) {
    this.logger.log(`[update] - Updating dog ID: ${id}...`);
    return this.dogsService.update(+id, updateDogDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    this.logger.log(`[remove] - Removing dog ID: ${id}...`);
    return this.dogsService.remove(+id);
  }
}
