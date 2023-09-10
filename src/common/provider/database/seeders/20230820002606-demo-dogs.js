'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const dogData = [];

    for (let i = 0; i < 10; i++) {
      dogData.push({
        name: faker.person.fullName(),
        breed: faker.animal.dog(),
        age: faker.number.int({ min: 1, max: 10 }),
        weight: faker.number.float({ min: 1, max: 50, precision: 0.1 }),
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: faker.number.int({ min: 1, max: 10 }),
        uuid: faker.string.uuid(),
      });
    }

    return queryInterface.bulkInsert('Dogs', dogData);
    /*
    return queryInterface.bulkInsert('Dogs', [
      {
        name: 'Pantufa',
        breed: 'Shih Tzu',
        age: 2,
        weight: 3.2,
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: 1,
      },
      {
        name: 'Buddy',
        breed: 'Labrador Retriever',
        age: 4,
        weight: 25.6,
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: 2,
      },
      {
        name: 'Daisy',
        breed: 'Golden Retriever',
        age: 3,
        weight: 28.9,
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: 1,
      },
      {
        name: 'Rocky',
        breed: 'German Shepherd',
        age: 5,
        weight: 30.1,
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: 2,
      },
      {
        name: 'Luna',
        breed: 'Husky',
        age: 2,
        weight: 20.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: 2,
      },
      {
        name: 'Charlie',
        breed: 'Poodle',
        age: 1,
        weight: 10.2,
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: 3,
      },
      {
        name: 'Bella',
        breed: 'Beagle',
        age: 4,
        weight: 15.8,
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: 3,
      },
      {
        name: 'Max',
        breed: 'Bulldog',
        age: 6,
        weight: 22.7,
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: 3,
      },
      {
        name: 'Lucy',
        breed: 'Shiba Inu',
        age: 2,
        weight: 14.3,
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: 7,
      },
      {
        name: 'Cooper',
        breed: 'Cocker Spaniel',
        age: 3,
        weight: 18.6,
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: 8,
      },
      {
        name: 'Sadie',
        breed: 'Boxer',
        age: 5,
        weight: 27.4,
        createdAt: new Date(),
        updatedAt: new Date(),
        animalShelterId: 5,
      },
    ]);
    */
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Dogs', null, {});
  },
};
