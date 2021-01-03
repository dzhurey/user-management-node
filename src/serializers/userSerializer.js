const JSONAPISerializer = require('jsonapi-serializer').Serializer
const config = require('./index')

module.exports = new JSONAPISerializer('users', {
  attributes: ['id', 'email', 'isActive', 'isConfirmed'],
  ...config.commonOptions
})