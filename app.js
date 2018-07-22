const koa = require('koa')
const bodyparser = require('koa-bodyparser')
// const resource = require('koa-static')
const app = new koa()
const fs = require('fs')
const routes = require('./routes')
var cors = require('koa-cors')
app.use(cors)
// 连接数据库
const mongoose = require('./config/baseConfig')
mongoose.connect()

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
app.use(bodyparser)
// app.use(main)
app.listen(3000)
