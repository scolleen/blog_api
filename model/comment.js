const mongoose = require('mongoose')
const moment = require('moment')

const comment = new mongoose.Schema({
  content: {
    required: true,
    type: String
  },
  name: String,
  contact: String,
  time: {
    type: String,
    default: moment().format()
  },
  type: Number,
  reply_id: String,
  arcticle_id: {
    type: String,
    default: '0'
  }
})

module.exports = mongoose.model('Comment', comment)
