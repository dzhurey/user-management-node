const moment = require('moment')

module.exports = function (format = 'YYYY-MM-DD') {
  return this.add(function (value) {
    const date = value ? moment(value, format) : null

    if (!date || !date.isValid()) {
      throw new Error('%s is not a valid date.')
    }

    return date.format(format)
  })
}
