const { Schema } = require('mongoose')

module.exports = new Schema({
  title: String,
  body: String,
  images: [String],
  date: { type: Date, default: Date.now() }
})
