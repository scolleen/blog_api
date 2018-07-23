const { Post } = require('../model')
const moment = require('moment')

var post = function () {}

post.prototype.index = async function (ctx) {
  let res = await Post.find({})
  ctx.body = {
    code: 1,
    list: res
  }
}
post.prototype.read = async function (ctx) {
  let id = ctx.request.body.id
  if (id) {
    let res = await Post.findOne({'_id': id})
    ctx.body = {
      code: 1,
      payload: res
    }
  } else {
    ctx.body = {
      code: 0,
      msg: '文章不存在'
    }
  }
}

post.prototype.create = async function (ctx) {
  let request = ctx.request.body
  let params = {
    title: request.title,
    content: request.content,
    type: request.type,
    time: moment(new Date()).format(),
    author: '南方姑娘'
  }
  let res = await Post.create({
    ...params
  })
  ctx.body = {
    code: 1,
    msg: '创建成功'
  }
}
module.exports = new post()
