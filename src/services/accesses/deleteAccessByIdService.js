const { Access } = require('../../models')

module.exports = async (id, options = {}) => {
  return Access.destroy({ where: { id } }, options)
}