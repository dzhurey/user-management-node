const { UserRole } = require('../../models')

const generateMeta = (param) => ({
  UserId: param.userId,
  RoleId: param.roleId
})

module.exports = async (param, options = {}) => {
  const meta = generateMeta(param)
  const record = await UserRole.create(meta, options)
  return record
}
