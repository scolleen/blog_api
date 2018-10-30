// const oauth = require('./oauth')
import * as Router from 'koa-router'
import postRouter from './post'
import commentRouter from './comment'
// import oauth from './oauth'

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = {
    code: 1,
    body: 'I am Southern Girl',
    msg: 'hello world'
  }
})
router.use(postRouter.routes(), postRouter.allowedMethods())
router.use(commentRouter.routes(), postRouter.allowedMethods())
// 用户登录授权
// router.use(oauth.routes(), oauth.allowedMethods())

export default router
