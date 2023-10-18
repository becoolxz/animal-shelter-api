import { Dog } from '../entities/dog.entity';

export class ResponseDogDto {
  uuid: string;
  name: string;
  age: number;
  breed: string;
  weight: number;
  animalShelterId: number;

  constructor(
    uuid: string,
    name: string,
    age: number,
    breed: string,
    weight: number,
    animalShelterId,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.weight = weight;
    this.animalShelterId = animalShelterId;
  }

  static convertDogToDto(dog: Dog): ResponseDogDto {
    const { uuid, name, age, breed, weight, animalShelterId } = dog;
    return new ResponseDogDto(uuid, name, age, breed, weight, animalShelterId);
  }
}
