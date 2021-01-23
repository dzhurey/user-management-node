const JSONAPISerializer = require('jsonapi-serializer').Serializer
const config = require('./index')

module.exports = new JSONAPISerializer('permission', {
  attributes: ['id', 'name', 'createdAt', 'updatedAt'],
  ...config.commonOptions
})