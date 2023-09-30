import { Sequelize } from 'sequelize-typescript';
import { Dog } from '../../../dogs/entities/dog.entity';
import { AnimalShelter } from '../../../animal-shelters/entities/animal-shelter.entity';
import configuration from '../../config/general-configuration';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      console.log('env: ', __dirname + '/us-east-1-bundle.pem');
      const sequelizeOpt = () => {
        if (!(process.env.NODE_ENV === 'development')) {
          return {
            ssl: {
              ca: fs.readFileSync('/usr/src/app/us-east-1-bundle.pem'),
            },
          };
        }
      };

      const configs = configuration();
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: configs.database.host,
        port: configs.database.port,
        username: configs.database.username,
        password: configs.database.password,
        database: configs.database.name,
        logging: true,
        dialectOptions: sequelizeOpt(),
      });

      sequelize.addModels([AnimalShelter, Dog]);

      return sequelize;
    },
  },
];
