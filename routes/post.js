var post = require('../controller/post')
const Router = require('koa-router')

const router = new Router()

router.get('/info', post.read)

module.exports = router