const _ = require('lodash')

module.exports = function () {
  return this.add(function (value, result, ctx) {
    if (_.isUndefined(value.number)) {
      throw new Error('Page number is required')
    }
    if (_.isNaN(value.number)) {
      throw new Error('Page number should be number')
    }
    if (_.isUndefined(value.size)) {
      throw new Error('Page size is required')
    }
    if (_.isNaN(value.size)) {
      throw new Error('Page size should be number')
    }
    return {
      number: parseInt(value.number),
      size: parseInt(value.size)
    }
  })
}
