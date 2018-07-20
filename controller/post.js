const { Post } = require('../model')

var post = function () {}

post.prototype.index = async function (ctx) {
  console.log(ctx)
  let res = await Post.find({})
  ctx.body = {
    code: 1,
    list: res
  }
}
post.prototype.read = async function (ctx) {
  let id = ctx.request.query.id
  if (id) {
    let res = await Post.findOne({_id: ctx.request.query.id})
    ctx.body = {
      code: 1,
      payload: res
    }
  } else {
    ctx.body = {
      code: 0,
      msg: 'ID不存在'
    }
  }
}

post.prototype.create = async function (ctx) {
}
module.exports = new post()
