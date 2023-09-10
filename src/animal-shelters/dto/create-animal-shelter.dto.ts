import { IsString } from 'class-validator';

export class CreateAnimalShelterDto {
  @IsString()
  name: string;

  @IsString()
  address: string;
}
