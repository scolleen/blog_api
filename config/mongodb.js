const mongoose = require('mongoose')
const insertBolg = mongoose.Schema({
  title: String,
  author: String,
  content: String
})

module.exports = mongoose.model('blog', insertBolg)