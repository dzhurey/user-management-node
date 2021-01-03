const bcrypt = require('bcrypt')
const config = require('../../../config')
const { User } = require('../../models')
const { AlreadyExistError } = require('../../utils/exception')

const { saltRounds } = config.authentication

const generateMeta = (form, password, activationCode) => ({
  email: form.email,
  password,
  activationCode,
  isActive: false,
  isConfirmed: false
})

const generateActivationCode = async () => {
  const str = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10)
  const user = await User.findOne({ where: { activationCode: str } })
  if (user) {
    return generateActivationCode()
  }
  return str
}

module.exports = async (form, options = {}) => {
  const user = await User.findOne({ where: { email: form.email } })
  if (user) {
    throw new AlreadyExistError('User with email already exist!')
  }
  const hashedPassword = await bcrypt.hash(form.password, saltRounds)
  const activationCode = await generateActivationCode()
  const meta = generateMeta(form, hashedPassword, activationCode)
  const record = await User.create(meta, options)
  return record
}
