const express = require('express')
const passport = require('passport')
const validation = require('../utils/validation')
const response = require('../utils/response')
const createAccessSchema = require('../schemas/access/createAccessSchema')
const getAllSchema = require('../schemas/getAllSchema')
const createOrUpdateAccessService = require('../services/accesses/createOrUpdateAccessService')
const getAllAccessesService = require('../services/accesses/getAllAccessesService')
const getAccessByIdService = require('../services/accesses/getAccessByIdService')
const deleteAccessByIdService = require('../services/accesses/deleteAccessByIdService')
const AccessSerializer = require('../serializers/accessSerializer')

const router = express.Router()

/* POST Access */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validation(createAccessSchema),
  async function (req, res, next) {
    try {
      const data = await createOrUpdateAccessService(null, req.form)
      response.JSONResponse(res, AccessSerializer, data, 201)
    } catch (error) {
      next(error)
    }
  }
)

/* PUT Access */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validation(createAccessSchema),
  async function (req, res, next) {
    try {
      const { id } = req.params
      const data = await createOrUpdateAccessService(id, req.form)
      response.JSONResponse(res, AccessSerializer, data, 200)
    } catch (error) {
      next(error)
    }
  }
)

/* GET Access */
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  validation.query(getAllSchema),
  async function (req, res, next) {
    try {
      const data = await getAllAccessesService(req.data)
      response.JSONResponse(res, AccessSerializer, data, 200)
    } catch (error) {
      next(error)
    }
  }
)

/* GET Access by id */
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const { id } = req.params
      const data = await getAccessByIdService(id)
      response.JSONResponse(res, AccessSerializer, data, 200)
    } catch (error) {
      next(error)
    }
  }
)

/* DELETE Access by id */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async function (req, res, next) {
    try {
      const { id } = req.params
      await deleteAccessByIdService(id)
      response.JSONResponse(res, null, null, 204)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
