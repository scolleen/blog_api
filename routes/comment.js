var comment = require('../controller/comment')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')()

const router = new Router()

router.get('/comment/read', bodyParser, comment.read)
router.post('/comment/create', bodyParser, comment.create)

module.exports = router
