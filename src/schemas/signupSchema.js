const validation = require('../utils/validation')
const field = validation.field

module.exports = [
  field('email').required().email(),
  field('password').required().minLength(8),
  field('password_confirmation').required().custom(async function(value, result, ctx) {
    const password = await result.password
    if (value !== password.value) {
      throw new Error('%s should be equal with password.')
    }
  }),
  field('first_name').required(),
  field('last_name').required()
]
