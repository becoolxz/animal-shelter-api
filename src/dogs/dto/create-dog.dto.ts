import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDogDto {
  @MaxLength(320)
  @MinLength(1)
  @IsString()
  name: string;

  @IsInt()
  @MaxLength(2)
  @MinLength(1)
  age: number;

  @IsString()
  @MaxLength(320)
  @MinLength(1)
  breed: string;

  @IsInt()
  @MaxLength(2)
  @MinLength(1)
  weight: number;

  @IsInt()
  @MaxLength(10)
  @MinLength(1)
  animalShelterId: number;
}
