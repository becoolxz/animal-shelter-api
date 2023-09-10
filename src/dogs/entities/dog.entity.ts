import { AnimalShelter } from '../../animal-shelters/entities/animal-shelter.entity';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';

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

  @ForeignKey(() => AnimalShelter)
  @Column
  animalShelterId: number;

  @BelongsTo(() => AnimalShelter)
  animalShelter: AnimalShelter;
}
