const _ = require('lodash')

const SINGLE_OPERATOR = [
  '=',
  '!=',
  '>',
  '<',
  '>=',
  '<='
]

const MULTI_OPERATOR = [
  'in',
  'not in'
]

const generateValue = (value, operator) => {
  if (MULTI_OPERATOR.indexOf(operator) > -1) {
    return value.split(',')
  }
  return value
}

module.exports = function () {
  return this.add(function (value, result, ctx) {

    const isValid = Object.keys(value)
      .some(
        key => value[key].value !== undefined && 
        value[key].operator !== undefined && 
        [...SINGLE_OPERATOR, ...MULTI_OPERATOR].indexOf(value[key].operator) > -1
      )
    if (!isValid) {
      throw new Error('Filter format is not valid')
    }
    return Object.keys(value).reduce((obj, key) => {
      obj[key] = {
        value: generateValue(value[key].value, value[key].operator),
        operator: value[key].operator
      }
      return obj
    }, {})
  })
}
