const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const config = require('../../config')
const { UnauthorizedError } = require('../utils/exception')

router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return next(new UnauthorizedError('Incorrect email or password.'))
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err)
      }
      const token = jwt.sign(user, config.apps.secret)
      return res.json({ token })
    })
  })(req, res)
})

module.exports = router
