'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('user_tenants', 'group_id', { allowNull: false, type: Sequelize.BIGINT })
    await queryInterface.removeColumn('user_tenants', 'user_group_id')
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('user_tenants', 'user_group_id', { allowNull: false, type: Sequelize.BIGINT })
    await queryInterface.removeColumn('user_tenants', 'group_id')
  }
};
