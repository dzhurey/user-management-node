const getAccessByIdService = require('./getAccessByIdService')

module.exports = async (id, options = {}) => {
  const data = await getAccessByIdService(id)
  return data.destroy({ where: { id } }, options)
}