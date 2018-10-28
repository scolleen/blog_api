import post from '../controller/post'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'

const router = new Router()

// 为当前路由设置前缀
router.prefix('/post')

router.get('/index', post.index)
router.get('/get_time', post.get_time)
router.get('/search', post.search)

router.post('/read', bodyParser(), post.read)
router.post('/create', bodyParser(), post.create)

export default router
