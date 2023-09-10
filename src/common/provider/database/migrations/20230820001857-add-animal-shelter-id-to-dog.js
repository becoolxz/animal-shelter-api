'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Dogs', 'animalShelterId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'AnimalShelters',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('Dogs', 'animalShelterId');
  },
};
