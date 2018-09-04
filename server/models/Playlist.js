let mongoose = require('mongoose')
let Schema = mongoose.Schema
let schemaName = 'PlayList'
let ObjectId = Schema.Types.ObjectId


let songSchema = new Schema({
  trackId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  albumArt: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  album: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  }
})

let schema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  songs: [songSchema]
})



module.exports = mongoose.model(schemaName, schema)