'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('AnimalShelters', 'uuid', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('AnimalShelters', 'uuid');
  },
};
