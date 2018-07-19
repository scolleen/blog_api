const koa = require('koa')
// const path = require('path')
// const resource = require('koa-static')
const app = new koa()
const fs = require('fs')
const routes = require('./routes')
// 连接数据库
const mongoose = require('./config/baseConfig')
mongoose.connect()

const blog = require('./config/mongodb')
// let test = new insertBolg({
//   title: 'yinxiupei',
//   author: 'me',
//   content: '你好哇'
// })
// test.save().then(res => {
//   console.log(res)
// })
blog.find({_id: '5b4ffd14afd98e520068ccdc'}).then(res => {
  console.log(res)
})
// 错误处理
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(erro)
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
}

// 路由
// routes
app.use(routes.routes(), routes.allowedMethods());

// app.use(main)
app.listen(3000)
