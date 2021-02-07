'use strict';

const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const sequelize = require('sequelize')

dotenv.config()
console.log('nemu file')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const isInternal = process.env.INTERNAL

    const roles = []
    const accesses = []
    const permissions = [{
      name: 'user-management',
      created_at: new Date(),
      updated_at: new Date()
    }]
    const tenants = []
    const groups = []
    const groupPermissionAccesses = []
    const users = []
    const userRoles = []
    const userTenants = []

    if (isInternal) {
      roles.push({
        name: 'internal',
        description: 'Internal dashboard access',
        created_at: new Date(),
        updated_at: new Date()
      })
      accesses.push({
        name: 'administrator',
        level: 0,
        created_at: new Date(),
        updated_at: new Date()
      })
      tenants.push({
        name: 'internal',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      })
      groups.push({
        name: 'administrator',
        tenant_id: 1,
        description: 'super user for internal admin',
        created_at: new Date(),
        updated_at: new Date()
      })
      groupPermissionAccesses.push({
        group_id: 1,
        permission_id: 1,
        access_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      })
      users.push({
        email: process.env.ADMINISTRATOR_EMAIL,
        password: await bcrypt.hash(process.env.ADMINISTRATOR_PASSWORD, parseInt(process.env.AUTH_SALT_ROUND)),
        activation_code: '',
        is_active: true,
        is_confirmed: true,
        created_at: new Date(),
        updated_at: new Date()
      })
      userRoles.push({
        user_id: 1,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      })
      userTenants.push({
        user_id: 1,
        tenant_id: 1,
        group_id: 1,
        is_active: true,
        is_current: false,
        created_at: new Date(),
        updated_at: new Date()
      })
    }

    await queryInterface.bulkInsert('roles', roles, {});
    await queryInterface.bulkInsert('accesses', accesses, {});
    await queryInterface.bulkInsert('permissions', permissions, {});
    await queryInterface.bulkInsert('tenants', tenants, {});
    await queryInterface.bulkInsert('groups', groups, {});
    await queryInterface.bulkInsert('group_permission_accesses', groupPermissionAccesses, {});
    await queryInterface.bulkInsert('users', users, {});
    await queryInterface.bulkInsert('user_roles', userRoles, {});
    await queryInterface.bulkInsert('user_tenants', userTenants, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('roles', {}, { truncate: true });
    await queryInterface.bulkDelete('accesses', {}, { truncate: true });
    await queryInterface.bulkDelete('permissions', {}, { truncate: true });
    await queryInterface.bulkDelete('tenants', {}, { truncate: true });
    await queryInterface.bulkDelete('groups', {}, { truncate: true });
    await queryInterface.bulkDelete('group_permission_accesses', {}, { truncate: true });
    await queryInterface.bulkDelete('users', {}, { truncate: true });
    await queryInterface.bulkDelete('user_roles', {}, { truncate: true });
    await queryInterface.bulkDelete('user_tenants', {}, { truncate: true });
  }
};
