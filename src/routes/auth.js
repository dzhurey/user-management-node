const express = require('express')
const validation = require('datalize')
const signupSchema = require('../schemas/signupSchema')
const signupService = require('../services/auth/signupService')
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

module.exports = router
