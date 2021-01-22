const { Access } = require('../../models')
const exception = require('../../utils/exception')

module.exports = async (id) => {
  const data = await Access.findOne({ where: { id } })
  if (data === null) {
    throw new exception.NotFoundError("Access not found!")
  }
}