import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Dog } from '../../dogs/entities/dog.entity';

@Table
export class AnimalShelter extends Model {
  @Column
  name: string;

  @Column
  address: string;

  @HasMany(() => Dog)
  dogs: Dog[];
}
