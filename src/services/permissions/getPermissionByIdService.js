const { Permission } = require('../../models')
const exception = require('../../utils/exception')

module.exports = async (id) => {
  const data = await Permission.findOne({ where: { id } })
  if (data === null) {
    throw new exception.NotFoundError("Permission not found!")
  }
  return data
}