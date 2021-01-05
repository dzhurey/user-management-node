const JSONAPISerializer = require('jsonapi-serializer').Serializer
const config = require('./index')

module.exports = new JSONAPISerializer('access', {
  attributes: ['id', 'name', 'level', 'createdAt', 'updatedAt'],
  ...config.commonOptions
})