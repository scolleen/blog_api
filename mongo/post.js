const mongoose = require('mongoose')

const post = new mongoose.Schema({
  title: String,
  author: String,
  content: String
})

module.exports = mongoose.model('Post', post)
