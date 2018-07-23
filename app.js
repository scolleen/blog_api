const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const app = new koa()
const fs = require('fs')
const routes = require('./routes')
// 连接数据库
const mongoose = require('./config/baseConfig')
mongoose.connect()

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  await next()
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
app.use(bodyparser)
// app.use(main)
app.listen(3000)
