class AlreadyExistError extends Error {
  constructor (message) {
    super()
    this.message = message
  }
}

class NotFoundError extends Error {
  constructor (message) {
    super()
    this.message = message
  }
}

class UnauthorizedError extends Error {
  constructor (message) {
    super()
    this.message = message
  }
}

class ForbiddenError extends Error {
  constructor (message) {
    super()
    this.message = message
  }
}

class ExternalError extends Error {
  constructor (message) {
    super()
    this.message = message
  }
}

module.exports = {
  AlreadyExistError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  ExternalError
}
