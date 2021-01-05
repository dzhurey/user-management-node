const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  apps: {
    baseURL: process.env.BASE_URL,
    isMultiTenant: process.env.IS_MULTI_TENANT,
    secret: process.env.APP_SECRET
  },
  authentication: {
    saltRounds: 10
  }
}
