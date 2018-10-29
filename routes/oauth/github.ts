import * as Router from "koa-router";
import * as fetch from 'node-fetch'

import config from '../../config/githubConfig'

const router = new Router()

router.prefix('/user')
router.get('/login', async (ctx) => {
  const type = ctx.query.type
  if (!type) {}
  if (type === 'github') {
    let path = `https://github.com/login/oauth/authorize?client_id=${config.clientId}&scope=${config.scope}&state=${config.randomString}`
    // 重定向到GitHub授权
    ctx.redirect(path)
  }
})
router.get('/oauth/github_callback', async (ctx) => {
  const code = ctx.query.code
  let path = 'https://github.com/login/oauth/access_token'
  const params = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code: code
  }
  await fetch(path, {
    body: JSON.stringify(params), // 使用 JSON.stringify() 否则报 400 错误
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST' // *GET, POST, PUT, DELETE, etc.
  })
    .then(response => {
      return response.text() // text()构造方法返回一个最新创建的Text 对象， 该对象带有可选参数 DOMString 作为文本节点的文本内容(textual content)
    })
    .then(result => {
      return result.split('&')[0].split('=')[1]
    })
    .then(async (token) => {
      let url = `https://api.github.com/user?access_token=${token}`
      await fetch(url, {
        method: 'GET'
      })
        .then(response => {
          return response.text() // text()构造方法返回一个最新创建的Text 对象， 该对象带有可选参数 DOMString 作为文本节点的文本内容(textual content)
        })
        .then(body => {
          ctx.body = body
        })
    })
    .catch(error => {
      console.log(error)
      throw new error()
    })
})

export default router
