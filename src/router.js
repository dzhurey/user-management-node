const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const accessesRouter = require('./routes/accesses')
const permissionsRouter = require('./routes/permissions')

module.exports = function (app) {
  app.use('/', indexRouter)
  app.use('/api/v1/users', usersRouter)
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/permissions', permissionsRouter)
  app.use('/api/v1/accesses', accessesRouter)
}