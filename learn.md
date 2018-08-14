# 关于使用koa搭建博客后端坎坷之路
上一篇开发者自述中有提到之后会更新博客搭建的‘心路历程’，因为现在还未结束项目的开发，有部分的功能和代码还属于未定型状态，所以从Koa入门开始了解这门Web框架。

1.了解一门语言或是一个框架，个人感觉最开始还是需要从文档开始。[Koa](https://koa.bootcss.com/)另外还可以看一下阮一峰老师的关于koa框架教程。

2.开始入手搭建项目（检查node版本 node >= v7.6.0）

```javascript
mkdir koa_project
npm init
npm install koa --save
```
完成安装后，在当前目录建立一个app.js文件，作为项目入口。
``` javascript
// app.js
const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000)
```
命令运行
``` javascript
node app.js
```
打开 [http://127.0.0.1:3000](http://127.0.0.1:3000),浏览器中会出现 ‘Hello World’那么第一步便成功了。
当然作为一个server的项目没有那么简单，还需要一系列的处理问题。

3.错误处理

```javascript
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // 打印错误
    console.log(err)
    ctx.response.status = err.statusCode || err.status || 500
    // 响应给页面的信息
    ctx.response.body = {
      message: err.message
    }
  }
}
app.use(handler())
```
handler()函数是一个async函数，代表异步处理函数，而参数next表示执行下一个异步处理的函数。在`try catch()`中出现错误，打印在命令行中，可以根据提示修复，另外在页面中也可以看到错误信息。当然你也可以自定义给用户看的提示信息，将代码中的`err.message`替换成其他的信息。

4.koa-router

作为Koa的一个路由中间件工具，在Koa中占据着重要位置。首先安装
```javascript
npm install koa-router --save
```
你可以在`app.js`文件中引入`koa-router`，但是这样会让`app.js`文件太过臃肿，所以这里决定将`koa-router`分离出来，将路由作为单独文件
新建一个routes文件，创建一个`index.js`文件，在`index.js`文件中引入`koa-router`，代码一分离，逻辑就显得清楚了
```javascript
const Router = require('koa-router')
const router = new Router()
// 可以引入各种有关路由文件
const XXX = require('XXX')
router.use(XXX.routes(), XXX.allowedMethods())

// 直接在文件中写入路由请求
router.get('/index', (ctx) => {
  ctx.body = {
    code: 1,
    msg: 'hello world'
  }
})

router.post('/login', (ctx) => {
  try {
    let res = await ...
    ctx.body = {
      code: 1,
      msg: res...
    }
  } catch (error) {
    ctx.body = {
      code: 0,
      msg: error
    }
  }
})

module.exports = router
```
路由设置完成，需要在`app.js`文件中引入
```javascript
// app.js
const routes = require('./routes')
app.use(routes.routes(), routes.allowedMethods())
```

5.Koa跨域问题

Koa跨域会在这里写两种方法，一种是利用原生方法，例如：
```javascript
// app.js
// 设置请求头
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  await next()
})
```
另一个是使用Koa中间件`koa2-cors`，[koa2-cors](https://github.com/zadzbw/koa2-cors)
```javascript
// 命令行
npm install koa2-cors --save
```
```javascript
// app.js
const cors = require('koa2-cors')
// 设置请求头
app.use(cors({
  origin: '*',
  allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}))
```
以上是Koa入门的基本配置，基本覆盖了大多数的配置，如果还需要其他的配置项，可自行添加。另外，以上配置未涉及到数据库的配置，这个根据用户使用数据库类型自行选择。

在我的blog中我是使用mongodb作为数据库，在后面的文章中会详细介绍，在此文章就不赘述。

下面PO出来我的配置
```javascript
// app.js 文件
const koa = require('koa')
const bodyparser = require('koa-bodyparser')
const app = new koa()
const routes = require('./routes')
const cors = require('koa2-cors')
// 连接数据库
const mongoose = require('./config/baseConfig')
mongoose.connect()

// 跨域问题
app.use(cors({
  origin: '*',
  allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}))

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

```

因为我是作为新手使用Koa作为框架搭建服务器端，会有很多说明和见解不到位的地方，老生勿喷，希望您能指出其中不足，当然欢迎您的指教。
