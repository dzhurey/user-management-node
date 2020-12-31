const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  development: {
    dialect: 'mysql',
    username: process.env.NODE_DB_USER,
    password: process.env.NODE_DB_PASSWORD || '',
    database: process.env.NODE_DB_NAME,
    host: process.env.NODE_DB_HOST,
    port: process.env.NODE_DB_PORT
  },
  test: {
    dialect: 'mysql',
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1'
  },
  production: {
    dialect: 'mysql',
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1'
  }
}
