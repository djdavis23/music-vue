let router = require('express').Router()
let Playlist = require('../models/Playlist')

router.get('/by-user/:userId', (req, res, next) => {
  Playlist.findOne({
    userId: req.params.userId
  })
    .then(playlist => {
      return res.send(playlist)
    })
    .catch(err => next())
})

router.post('', (req, res, next) => {
  console.log(req.body)
  Playlist.create(req.body)
    .then(playList => {
      return res.send(playList)
    })
    .catch(err => next())
})

router.put('/:id', (req, res, next) => {
  Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(playlist => res.send(playlist))
    .catch(err => next())
})

router.delete('/:id', (req, res, next) => {
  Playlist.findByIdAndRemove(req.params.id)
    .then(() => res.send({
      message: "Playlist deleted"
    }))
    .catch(err => next())
})




module.exports = router