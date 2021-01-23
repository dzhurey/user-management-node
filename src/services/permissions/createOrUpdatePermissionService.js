const { Permission } = require('../../models')
const getPermissionByIdService = require('./getPermissionByIdService')

module.exports = async (id, form, options = {}) => {
  let permission = Permission.build({})
  if (id) {
    permission = await getPermissionByIdService(id)
  }
  permission.name = form.name
  await permission.save(options)
  return permission
}