//set up server
let express = require('express')
let bp = require('body-parser')
let cors = require('cors')
let server = express()
let port = 3000

//connect to db
require('./db/db-config.js')

server.use(cors())

//configure middleware
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))

//routes
let userRoutes = require('./routes/users')
let musicRoutes = require('./routes/playlists')


server.use('/users', userRoutes)
server.use('/api/playlists', musicRoutes)

//default error catching
server.use('/api/playlists/*', (err, req, res, next) => {
  res.status(400).send(err.message)
})

server.use('*', (req, res, next) => {
  res.status(404).send('Resource not found')
})


server.listen(port, () => {
  console.log("Server is listening on port: ", port)
})