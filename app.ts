import * as koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import * as cors from 'koa2-cors'

import routes from './routes'
// 连接数据库
import mongoose from './config/baseConfig'
mongoose()

const app = new koa()

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
    await next()
  } catch (err) {
    console.log(err)
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
}

// 为所有路由设置前缀
routes.prefix('/api')

// routes
app.use(routes.routes())
// 引入koa-bodyparser 它用于解析客户端请求的body中的内容,内部使用JSON编码处理
app.use(bodyparser())
app.use(handler)
app.listen(3000)

export default app
