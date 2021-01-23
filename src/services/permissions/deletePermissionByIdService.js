const getPermissionByIdService = require('./getPermissionByIdService')

module.exports = async (id, options = {}) => {
  const data = await getPermissionByIdService(id)
  return data.destroy({ where: { id } }, options)
}