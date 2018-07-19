const blog = require('./config/mongodb')
let test = new blog({
  title: 'yinxiupei',
  author: 'me',
  content: '你好哇'
})
test.save().then(res => {
  console.log(res)
})