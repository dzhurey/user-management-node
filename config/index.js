const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  apps: {
    baseURL: 'localhost:5010',
    isMultiTenant: process.env.IS_MULTI_TENANT,
    secret: 'ajkshdjouo3y8doay8aho3y8jawdio'
  },
  authentication: {
    saltRounds: 10
  }
}
