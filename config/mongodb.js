const mongoose = require('./baseConfig')

const accountSchema = mongoose.Schema({
  accountName: {
    type: String,
    required: true
  },
  accountPwd: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('modelName', accountSchema, 'account')