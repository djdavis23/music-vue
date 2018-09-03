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
    .catch(err => {
      res.status(401).send(err.message)
    })
})

router.post('/register', (req, res, next) => {
  User.create({
    userName: req.body.userName,
    password: req.body.password
  })
    .then(user => {
      return res.send(user)
    })
    .catch(err => {
      res.status(400).send(err.message)
    })
})

module.exports = router