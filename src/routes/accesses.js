const express = require('express')
const passport = require('passport')
const validation = require('../utils/validation')
const response = require('../utils/response')
const createAccessSchema = require('../schemas/access/createAccessSchema')
const getAllSchema = require('../schemas/getAllSchema')
const createOrUpdateAccessService = require('../services/accesses/createOrUpdateAccessService')
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

/* GET Access */
router.get(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  validation.query(getAllSchema), 
  async function (req, res, next) {
    try {
      const data = await getAllAccess(req.query)
      response.JSONResponse(res, AccessSerializer, data, 200)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
