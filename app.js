/* eslint-disable import/first */
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('regenerator-runtime/runtime')
const dotenv = require('dotenv')
const { NotFoundError } = require('./src/utils/exception')

dotenv.config()

const { handler: errorHandler } = require('./src/middlewares/errorHandler')

const db = require('./src/models')
require('./src/utils/passport')

const app = express()

// db.sequelize.sync()

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

require('./src/router')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new NotFoundError('API path not found!'))
})

// error handler
app.use(errorHandler)

module.exports = app
