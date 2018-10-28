import * as Router from 'koa-router';
const bodyParser = require('koa-bodyparser')()
import comment from '../controller/comment'

const router = new Router()

// 为当前路由设置前缀
router.prefix('/comment')

router.get('/read', bodyParser, comment.read)
router.post('/create', bodyParser, comment.create)

export default router