const { Comment } = require('../model')

const comment = {}
comment.prototype.create = function (ctx) {
  let request = ctx.request.body
  let params = {
    content: request.content,
    name: request.name,
    contact: request.contact,
    type: request.type,
    reply_id: request.reply_id
  }
  let res = await Comment.create({
    ...params
  })
  ctx.body = {
    code: 1,
    msg: '创建成功'
  }
}
module.exports = new comment()
