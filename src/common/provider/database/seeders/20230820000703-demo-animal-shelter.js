'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const shelterData = [];

    for (let i = 0; i < 10; i++) {
      shelterData.push({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        createdAt: new Date(),
        updatedAt: new Date(),
        uuid: faker.string.uuid(),
      });
    }

    return queryInterface.bulkInsert('AnimalShelters', shelterData);
    /*
    return queryInterface.bulkInsert('AnimalShelters', [
      {
        name: 'Paws and Claws Animal Shelter',
        address: '123 Main Street, Cityville, State, ZIP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Happy Tails Rescue Center',
        address: '456 Elm Avenue, Townsville, State, ZIP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Forever Friends Animal Haven',
        address: '789 Oak Lane, Villagetown, State, ZIP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rescue Paws Sanctuary',
        address: '101 Maple Road, Countryside, State, ZIP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Second Chance Animal Shelter',
        address: '555 Cedar Street, Uptown, State, ZIP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Safe Haven Pet Adoption',
        address: '222 Pine Boulevard, Riverside, State, ZIP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Furry Companions Rescue',
        address: '777 Willow Drive, Mountainview, State, ZIP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hearts & Paws Animal Refuge',
        address: '888 Birch Court, Lakeside, State, ZIP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Loving Arms Animal Sanctuary',
        address: '333 Magnolia Avenue, Harmony, State, ZIP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Whisker Haven Rescue',
        address: '444 Rose Street, Meadowville, State, ZIP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    */
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('AnimalShelters', null, {});
  },
};
