const { sequelize } = require('../../models')
const createUserService = require('./createUserService')
const createUserRoleService = require('../userRoles/createUserRoleService');
const user = require('../../models/user');

module.exports = async (form) => {
  const transaction = await sequelize.transaction();
  try {
    // create user
    const user = await createUserService(form, { transaction })
    // create user role
    await createUserRoleService({ userId: user.id, roleId: form.role.id }, { transaction })
    // if has tenant:
    //   create tenant
    //   create group with owner permission
    //   create user tenant
    //   create user group
    // send email to confirm

    await transaction.commit()
    return user
  } catch (error) {
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    await transaction.rollback()
    throw error
  }
}
