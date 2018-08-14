const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const app = new koa()
const routes = require('./routes')
const cors = require('koa2-cors')
// 连接数据库
const mongoose = require('./config/baseConfig')
mongoose.connect()

app.use(cors({
  origin: '*',
  allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}))

// 设置请求头
// app.use(async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*')
//   ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
//   await next()
// })
// 错误处理
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err)
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
}

// 路由
// routes
app.use(routes.routes(), routes.allowedMethods())
// 引入koa-bodyparser 它用于解析客户端请求的body中的内容,内部使用JSON编码处理
app.use(bodyparser())
app.use(handler())
app.listen(3000)
