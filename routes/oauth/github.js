const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')()

const config = require('../../config/githubConfig')
const router = new Router()

router.prefix('/user')
router.get('/login', bodyParser, async (ctx) => {
  const type = ctx.query.type
  if (!type) {}
  if (type === 'github') {
    let path = 'https://github.com/login/oauth/authorize'
    path += '?client_id=' + config.clientId + '&scope=' + config.scope + '&state=' + config.randomString
    ctx.redirect(path)
  }
})

router.get('/oauth/github_callback', async (ctx) => {
  const code = ctx.query.code
  const state = ctx.query.state
  let path = 'https://github.com/login/oauth/access_token'
  const params = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code: code
  }
  await handleGithubCallback(path, params)
})

function handleGithubCallback (url, params) {
}

module.exports = router
