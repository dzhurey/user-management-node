const { Access } = require('../../models')

module.exports = async (id, form, options = {}) => {
  let access = Access.build({})
  if (id) {
    access = await Access.findOne({ where: { id } })
  }
  access.name = form.name
  access.level = form.level
  await access.save(options)
  return access
}