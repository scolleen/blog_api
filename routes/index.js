const router = require('koa-router')()
const post = require('./post')
const comment = require('./comment')
const oauth = require('./oauth')

router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 1,
    body: 'I am Southern Girl',
    msg: 'hello world'
  }
})
router.use(post.routes(), post.allowedMethods())
router.use(comment.routes(), comment.allowedMethods())
// 用户登录授权
router.use(oauth.routes(), oauth.allowedMethods())

module.exports = router
