const { find } = require('lodash')
const { Role } = require('../../../models')

module.exports = function (field = 'id') {
  return this.add(async function (value) {
    const roles = await Role.findAll()
    const role = find(roles, rec => rec[field] === value)

    if (!role) {
      throw new Error('%s is not a valid role.')
    }

    return role
  })
}
