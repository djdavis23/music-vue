let router = require('express').Router()
let User = require('../models/User')

router.post('/login', (req, res, next) => {
  User.findOne({
    userName: req.body.userName,
    password: req.body.password
  })
    .then(user => {
      return res.send(user)
    })
    .catch(err => next())
})

router.post('/register', (req, res, next) => {
  User.create({
    userName: req.body.userName,
    password: req.body.password
  })
    .then(user => {
      return res.send(user)
    })
    .catch(err => next())
})

module.exports = router