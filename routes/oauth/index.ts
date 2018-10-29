const router = require('koa-router')()

const github = require('./github')
router.use(github.routes(), github.allowedMethods())

export default router