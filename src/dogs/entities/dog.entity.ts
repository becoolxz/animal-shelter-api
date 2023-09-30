import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AnimalShelter } from '../../animal-shelters/entities/animal-shelter.entity';

@Table
export class Dog extends Model {
  @Column
  name: string;

  @Column
  age: number;

  @Column
  breed: string;

  @Column
  weight: number;

  @Column
  @ForeignKey(() => AnimalShelter)
  animalShelterId: number;

  @BelongsTo(() => AnimalShelter)
  animalShelter: AnimalShelter;
}
