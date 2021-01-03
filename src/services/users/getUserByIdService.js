const { User } = require('../../models')
const { NotFoundError } = require('../../utils/exception')

module.exports = async (id) => {
  const user = await User.findOne({ where: { id } })
  if (!user) {
    throw new NotFoundError('User with activation code not found!')
  }
  return user
}
