const express = require('express')
const models = require('../models')

const router = express.Router()

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await models.User.findAll()
  res.send(users)
})

module.exports = router
