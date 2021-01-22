const { Access } = require('../../models')

module.exports = async (id) => {
  return Access.findOne({ where: { id } })
}