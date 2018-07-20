var Router = require('koa-router')
const post = require('./post')

const router = new Router()

router.use(post.routes(), post.allowedMethods())

module.exports = router
