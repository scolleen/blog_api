var post = require('../controller/post')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')()

const router = new Router()
// 为当前路由设置前缀
router.prefix('/post')

router.get('/index', post.index)
router.get('/get_time', post.get_time)
router.get('/search', post.search)

router.post('/read', bodyParser, post.read)
router.post('/create', bodyParser, post.create)

module.exports = router