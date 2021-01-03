'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'activation_code', { type: Sequelize.STRING })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'activation_code')
  }
};
