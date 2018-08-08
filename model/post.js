const mongoose = require('mongoose')
const moment = require('moment')

const post = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  content: {
    type: String,
    required: true
  },
  time: {
    type: String,
    default: moment().format()
  },
  type: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Post', post)
