const { Post } = require('../model')

var post = function () {}

post.prototype.index = async function (ctx) {
  console.log(ctx)
  let res = await Post.find({})
  ctx.body = {
    code: 1,
    list: res
  }
}
// var createPost = new Post({
//   title: 'hello',
//   author: 'can',
//   content: 'hello world!',
//   type: 1,
//   time: new Date()
// })
// createPost.save().then(() => {
//   console.log('successfully saved!')
// }).catch(error => {
//   console.log(error)
// })

module.exports = new post()