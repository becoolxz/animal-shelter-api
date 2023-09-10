module.exports = {
  development: {
    host: process.env.DATABASE_HOST,
    username: 'postgres',
    password: 'example',
    database: 'doggy_dev',
    dialect: 'postgres',
    seederStorage: 'json',
  },
};
