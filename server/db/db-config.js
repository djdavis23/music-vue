let mongoose = require('mongoose')
let connection = mongoose.connection
const connectionString = ('mongodb://myuser:password23@ds018568.mlab.com:18568/musicvue')

mongoose.connect(connectionString, {
  useNewUrlParser: true
})

connection.on('error', error => {
  console.log("DB ERROR: ", error.message)
})

connection.once('open', () => {
  console.log("Connected to database")
})

