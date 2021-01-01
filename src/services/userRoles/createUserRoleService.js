const { UserRole } = require('../../models')

const generateMeta = (param) => ({
  userId: param.userId,
  roleId: param.roleId
})

module.exports = async (param, options = {}) => {
  const meta = generateMeta(param)
  const record = await UserRole.create(meta, options)
  return record
}
