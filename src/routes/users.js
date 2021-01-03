const express = require('express')
const validation = require('../utils/validation')
const response = require('../utils/response')
const models = require('../models')
const signupSchema = require('../schemas/signupSchema')
const signupService = require('../services/users/signupService')
const activateUser = require('../services/users/activateUser')
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
    await activateUser(activationCode)
    response.JSONResponse(res, null, null, 200)
  } catch (error) {
    next(error)
  }
})

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await models.User.findAll()
  res.send(users)
})

module.exports = router
