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
    default: moment(new Date()).format()
  },
  type: {
    type: Number,
    required: true
  }
})

export default mongoose.model('Post', post)
