const { Schema } = require('mongoose')
const config = require('@jibadano/config')

module.exports = new Schema({
  _id: {
    type: String,
    match:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    required: true,
    lowercase: true,
    trim: true,
    maxLength: 128,
    alias: 'email'
  },
  name: String,
  avatar: String,
  jobTitle: String
})
