const { Access } = require('../../models')
const getAccessByIdService = require('./getAccessByIdService')

module.exports = async (id, form, options = {}) => {
  let access = Access.build({})
  if (id) {
    access = await getAccessByIdService(id)
  }
  access.name = form.name
  access.level = form.level
  await access.save(options)
  return access
}