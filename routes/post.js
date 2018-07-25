var post = require('../controller/post')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')()

const router = new Router()

router.get('/post/index', post.index)
router.post('/post/read', bodyParser, post.read)
router.post('/post/create', bodyParser, post.create)
router.get('/post/get_time', post.get_time)
router.get('/post/search', post.search)

module.exports = router