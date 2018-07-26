const { Post } = require('../model')
const moment = require('moment')

var post = function () {}
// 所有文章 + 分页功能
post.prototype.index = async function (ctx) {
  let page = ctx.request.query.page || 2
  let pageSize = 3
  let start = (page - 1) * pageSize
  let res = await Post.find({}).skip(start).limit(pageSize).sort({ time: 'desc' })
  ctx.body = {
    code: 1,
    list: res
  }
}
// 查看详情
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
// 创建文章
post.prototype.create = async function (ctx) {
  let request = ctx.request.body
  let params = {
    title: request.title,
    content: request.content,
    type: request.type,
    time: moment().format(),
    author: '南方姑娘'
  }
  let res = await Post.create({
    ...params
  })
  ctx.body = {
    code: 1,
    id: res._id,
    msg: '创建成功'
  }
}
// 时间分组
post.prototype.get_time = async function (ctx) {
  let list = await Post.aggregate([
    {
      $group: {
        _id : { $substr: ["$time", 0, 4] },
        num: {
          $sum : 1
        }
      }
    }
  ]).sort({ _id: 'desc' })
  ctx.body = {
    code: 1,
    time_list: list
  }
}
// 模糊查询
post.prototype.search = async function (ctx) {
  let key = ctx.request.query.key
  let list = await Post.find({ "content":{ $regex: key, $options: 'i' } }).sort({ time: 'desc' })
  ctx.body = {
    code: 1,
    body: list
  }
}
module.exports = new post()
