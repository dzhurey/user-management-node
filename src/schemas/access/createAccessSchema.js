const validation = require('../../utils/validation')
const field = validation.field

module.exports = [
  field('name').required(),
  field('level').required().int()
]
