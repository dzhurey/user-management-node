const express = require('express')

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/error', function (req, res, next) {
  throw new Error("shold return errro")
  res.render('index', { title: 'Express' })
})

module.exports = router
