import { Sequelize } from 'sequelize-typescript';
import { Dog } from '../../../dogs/entities/dog.entity';
import { AnimalShelter } from '../../../animal-shelters/entities/animal-shelter.entity';
import configuration from '../../config/general-configuration';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const configs = configuration();
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configs.database.host,
        port: configs.database.port,
        username: configs.database.username,
        password: configs.database.password,
        database: configs.database.name,
        logging: true,
      });

      sequelize.addModels([AnimalShelter, Dog]);

      return sequelize;
    },
  },
];
