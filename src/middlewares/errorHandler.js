const datalize = require('datalize')
const {
  AlreadyExistError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  ExternalError
} = require('../utils/exception')

const responseJSON = (err, message) => ({
  success: false,
  message,
  data: err
})

const handler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).send(responseJSON(err, 'Not Found'))
    next(err)
  } else if (err instanceof ForbiddenError) {
    res.status(403).send(responseJSON(err, 'Forbidden'))
    next(err)
  } else if (err instanceof UnauthorizedError) {
    res.status(401).send(responseJSON(err, 'Unauthorize'))
    next(err)
  } else if (err instanceof AlreadyExistError) {
    res.status(409).send(responseJSON(err, 'Already Exist'))
    next(err)
  } else if (err instanceof ExternalError) {
    res.status(503).send(responseJSON(err, 'External Service Unavailable'))
    next(err)
  } else if (err instanceof datalize.Error) {
    res.status(400).send(responseJSON(err, 'Validation Error'))
  } else {
    res.status(500).send(responseJSON(err, 'Internal Server Error'))
    next(err)
  }
}

module.exports = { handler }
