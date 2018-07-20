const mongoose = require('mongoose')

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
  time: String,
  type: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Post', post)
