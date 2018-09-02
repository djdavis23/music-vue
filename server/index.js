//set up server
let express = require('express')
let bp = require('body-parser')
let cors = require('cors')
let server = express()
let port = 3000

//configure middleware
server.use(bp.json())
server.use(bp.urlencoded({
  extended: true
}))
server.use(cors())

//connect to db
require('./db/db-config.js')


server.listen(port, () => {
  console.log("Server is listening on port: ", port)
})