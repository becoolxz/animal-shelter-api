// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

module.exports = {
  development: {
    host: 'localhost',
    username: 'postgres',
    password: 'example',
    database: 'doggy_dev',
    dialect: 'postgres', // Explicitly specify the dialect as 'postgres'
    seederStorage: 'json',
  },
  production: {
    host: 'dog-shelter-database.c9ngudud6p47.us-east-1.rds.amazonaws.com',
    username: 'postgres',
    password: 'DFTZJBch05JFng8lG7tu',
    database: 'doggy_dev',
    dialect: 'postgres', // Explicitly specify the dialect as 'postgres'
    seederStorage: 'json',
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync('configurations/certificates/us-east-1-bundle.pem'), // Provide the path to your SSL certificate file
      },
    },
  },
};
