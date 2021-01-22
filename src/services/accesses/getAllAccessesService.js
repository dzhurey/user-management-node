const { Access } = require('../../models')

module.exports = async (params) => {
  return Access.findAll()
}