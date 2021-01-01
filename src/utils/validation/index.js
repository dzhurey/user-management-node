const datalize = require('datalize')
const isPagingOptionsValidator = require('./validators/isPagingOptionsValidator')
const dateValidator = require('./validators/dateValidator')
const isRoleOptionsValidator = require('./validators/isRoleOptionsValidator')

datalize.set('autoValidate', true)

datalize.Field.prototype.isPagingOptions = isPagingOptionsValidator
datalize.Field.prototype.date = dateValidator
datalize.Field.prototype.isRoleOptions = isRoleOptionsValidator

module.exports = datalize
