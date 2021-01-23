const datalize = require('datalize')
const isPagingOptionsValidator = require('./validators/isPagingOptionsValidator')
const dateValidator = require('./validators/dateValidator')
const isRoleOptionsValidator = require('./validators/isRoleOptionsValidator')
const isFilterValidator = require('./validators/isFilterValidator')
const isSortValidator = require('./validators/isSortValidator')

datalize.set('autoValidate', true)

datalize.Field.prototype.isPagingOptions = isPagingOptionsValidator
datalize.Field.prototype.date = dateValidator
datalize.Field.prototype.isRoleOptions = isRoleOptionsValidator
datalize.Field.prototype.isFilter = isFilterValidator
datalize.Field.prototype.isSort = isSortValidator

module.exports = datalize
