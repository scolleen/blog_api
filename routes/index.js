var Router = require('koa-router')
const post = require('./post')

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 1,
    body: 'I am Southern Girl',
    msg: 'hello world'
  }
})
router.use(post.routes(), post.allowedMethods())

module.exports = router
