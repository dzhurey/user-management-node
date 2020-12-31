const bcrypt = require('bcrypt')
const config = require('../../../config')
const { User } = require('../../models')

const { saltRounds } = config.authentication

const generateMeta = (form, password) => ({
  username: form.email,
  password,
  firstName: form.first_name,
  lastName: form.last_name,
  isActive: true
})

module.exports = async (form) => {
  const hashedPassword = await bcrypt.hash(form.password, saltRounds)
  const meta = generateMeta(form, hashedPassword)
  const record = await User.create(meta)
  return record
}
