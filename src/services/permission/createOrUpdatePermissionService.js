const { Permission } = require('../../models')

module.exports = async (id, form, options = {}) => {
  let permission = Permission.build({})
  if (id) {
    permission = await Permission.findOne({ where: { id } })
  }
  permission.name = form.name
  await permission.save(options)
  return permission
}