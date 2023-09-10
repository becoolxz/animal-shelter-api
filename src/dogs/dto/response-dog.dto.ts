export class ResponseDogDto {
  id: number;
  name: string;
  age: number;
  breed: string;
  weight: number;

  constructor(
    id: number,
    name: string,
    age: number,
    breed: string,
    weight: number,
  ) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.weight = weight;
  }
}
