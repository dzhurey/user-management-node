const bcrypt = require('bcrypt')
const config = require('../../../config')
const { User } = require('../../models')

const { saltRounds } = config.authentication

const generateMeta = (form, password) => ({
  username: form.email,
  password,
  isActive: false,
  isConfirmed: false
})

module.exports = async (form, options = {}) => {
  const hashedPassword = await bcrypt.hash(form.password, saltRounds)
  const meta = generateMeta(form, hashedPassword)
  const record = await User.create(meta, options)
  return record
}
