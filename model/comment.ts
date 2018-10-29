import * as moment from 'moment'
import * as mongoose from 'mongoose'

interface commentParams {
  content: String, // 评论内容
  name: String, // 用户名
  contact: String, // 联系方式
  time: String, // 创建时间
  type: Number, // 类型
  reply_id: String, // 回复ID
  arcticle_id: String // 文章ID
}


const comment = new mongoose.Schema({
  content: {
    required: true,
    type: String
  },
  name: String,
  contact: String,
  time: {
    type: String,
    default: moment(new Date()).format()
  },
  type: Number,
  reply_id: String,
  arcticle_id: {
    type: String,
    default: '0'
  }
})

export default mongoose.model('Comment', comment)