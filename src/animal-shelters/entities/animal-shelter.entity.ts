import { Dog } from '../../dogs/entities/dog.entity';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';

@Table
export class AnimalShelter extends Model {
  @Column
  name: string;

  @Column
  address: string;

  @HasMany(() => Dog)
  dogs: Dog[];
}
