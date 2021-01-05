const express = require('express')
const passport = require('passport')
const validation = require('../utils/validation')
const response = require('../utils/response')
const signupSchema = require('../schemas/signupSchema')
const signupService = require('../services/users/signupService')
const activateUserService = require('../services/users/activateUserService')
const getUserByIdService = require('../services/users/getUserByIdService')
const UserSerializer = require('../serializers/userSerializer')

const router = express.Router()

/* POST user signup */
router.post('/signup', validation(signupSchema), async function (req, res, next) {
  try {
    const data = await signupService(req.form)
    response.JSONResponse(res, UserSerializer, data, 201)
  } catch (error) {
    next(error)
  }
})

/* GET activate user */
router.get('/activate/:activationCode', async function (req, res, next) {
  try {
    const { activationCode } = req.params
    await activateUserService(activationCode)
    response.JSONResponse(res, null, null, 204)
  } catch (error) {
    next(error)
  }
})

/* GET user by id. */
router.get('/:id', passport.authenticate('jwt', {session: false}), async function (req, res, next) {
  try {
    const { id } = req.params
    const data = await getUserByIdService(id)
    response.JSONResponse(res, UserSerializer, data, 200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
