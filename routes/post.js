var post = require('../controller/post')
const Router = require('koa-router')

const router = new Router()

router.get('/post/index', post.index)
router.get('/post/read', post.read)
router.post('/post/create', post.create)

module.exports = router