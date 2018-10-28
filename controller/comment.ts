import { Comment } from '../model'
var comment = function () {}

comment.prototype.create = async function (ctx) {
  let request = ctx.request.body
  /* type 值
  0 评论
  1 留言板留言
  */
  let params = {
    content: request.content,
    name: request.name,
    contact: request.contact,
    type: request.type ? request.type : 0,
    arcticle_id: request.arcticle_id,
    reply_id: request.reply_id
  }
  try {
    let res = await Comment.create({
      ...params
    })
    ctx.body = {
      code: 1,
      msg: '创建成功',
      id: res._id
    }
  } catch(e) {
    ctx.body = {
      code: 0,
      msg: '参数不完整'
    }
  }
}
comment.prototype.read = async function (ctx) {
  let arcticle_id = ctx.query.arcticle_id
  let res = ''
  if (arcticle_id) {
    res = await Comment.find({ 'arcticle_id': arcticle_id }).sort({ time: 'desc' })
  } else {
    res = await Comment.find({ 'arcticle_id': '0'}).sort({ time: 'desc' })
  }
  ctx.body = {
    code: 1,
    payload: res
  }
}

export default new comment()
