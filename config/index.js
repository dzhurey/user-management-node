const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  apps: {
    isMultiTenant: process.env.IS_MULTI_TENANT
  },
  authentication: {
    saltRounds: 10
  }
}
