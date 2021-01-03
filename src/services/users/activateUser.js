const { User } = require('../../models')
const { NotFoundError } = require('../../utils/exception')

module.exports = async (activationCode, options = {}) => {
  const user = await User.findOne({ where: { activationCode } })
  if (!user) {
    throw new NotFoundError('User with activation code not found!')
  }
  user.isActive = true
  user.isConfirmed = true
  await user.save(options)
  return user
}
