const express = require('express')
const validation = require('../utils/validation')
const models = require('../models')
const signupSchema = require('../schemas/signupSchema')
const signupService = require('../services/users/signupService')

const router = express.Router()

/* POST user signup */
router.post('/signup', validation(signupSchema), async function (req, res, next) {
  try {
    const data = await signupService(req.form)
    res.send(data)
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
