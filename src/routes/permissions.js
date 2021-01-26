const express = require('express')
const passport = require('passport')
const validation = require('../utils/validation')
const response = require('../utils/response')
const createPermissionSchema = require('../schemas/permission/createPermissionSchema')
const createOrUpdatePermissionService = require('../services/permissions/createOrUpdatePermissionService')
const PermissionSerializer = require('../serializers/permissionSerializer')
const getPermissionByIdService = require('../services/permissions/getPermissionByIdService')
const deletePermissionByIdService = require('../services/permissions/deletePermissionByIdService')
const getAllPermissionsService = require('../services/permissions/getAllPermissionsService')
const getAllSchema = require('../schemas/getAllSchema')

const router = express.Router()

/* POST Permission */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validation(createPermissionSchema),
  async function (req, res, next) {
    try {
      const data = await createOrUpdatePermissionService(null, req.form)
      response.JSONResponse(res, PermissionSerializer, data, 201)
    } catch (error) {
      next(error)
    }
  }
)

/* GET Permission by id */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const { id } = req.params
      const data = await getPermissionByIdService(id)
      response.JSONResponse(res, PermissionSerializer, data, 200)
    } catch (error) {
      next(error)
    }
  }
)

/* PUT Permission */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validation(createPermissionSchema),
  async function (req, res, next) {
    try {
      const { id } = req.params
      const data = await createOrUpdatePermissionService(id, req.form)
      response.JSONResponse(res, PermissionSerializer, data, 200)
    } catch (error) {
      next(error)
    }
  }
)

/* DELETE Permission by id */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const { id } = req.params
      await deletePermissionByIdService(id)
      response.JSONResponse(res, null, null, 204)
    } catch (error) {
      next(error)
    }
  }
)

/* GET Permission */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  validation.query(getAllSchema),
  async function (req, res, next) {
    try {
      const data = await getAllPermissionsService(req.data)
      response.JSONResponse(res, PermissionSerializer, data.data, 200, data.pagination)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
