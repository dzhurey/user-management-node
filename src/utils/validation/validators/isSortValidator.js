const _ = require('lodash')

const DIRECTIONS = [
  'asc',
  'desc'
]

module.exports = function () {
  return this.add(function (value, result, ctx) {

    const isValid = Object.keys(value)
      .some(
        key => DIRECTIONS.indexOf(value[key]) > -1
      )
    if (!isValid) {
      throw new Error('Sort format is not valid')
    }
    return Object.keys(value).map(key => {
      return [key, value[key]]
    })
  })
}
