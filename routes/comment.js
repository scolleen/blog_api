var comment = require('../controller/comment')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')()

const router = new Router()

// 为当前路由设置前缀
router.prefix('/comment')

router.get('/read', bodyParser, comment.read)
router.post('/create', bodyParser, comment.create)

module.exports = router
