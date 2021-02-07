const { intersection } = require('lodash')
const { UnauthorizedError } = require('../utils/exception')
const { Role, Permission, Access } = require('../models')

module.exports = (allowedRoles, allowedPermission, allowedAccess) => async (req, res, next) => {
  const { roles, permissions } = req.user
  const intersectRole = intersection(roles, allowedRoles)
  if (intersectRole.length === 0) {
    next(new UnauthorizedError('You are not authorized to do this operation!'))
  }
  const isAllowed = permissions.some(p => {
    const ps = p.split('__')
    return ps[0] === allowedPermission && ps[1] === allowedAccess
  })
  if (!isAllowed) {
    next(new UnauthorizedError('You are not authorized to do this operation!'))
  }
  next()
}
