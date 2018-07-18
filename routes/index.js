var Router = require('koa-router')
var data = require('./index.json')
const router = new Router()

router.get('/info', (ctx, next) => {
  ctx.body = data
  console.log(ctx)
})
module.exports = router
