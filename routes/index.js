const express = require('express')
const router = express.Router()

let modules = require('../public/js/modules.json')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Rockpis App',
    modules: modules
  })
})

module.exports = router