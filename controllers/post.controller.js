const Post = require('../models/post.model')
const ErrorResponse = require('../utils/ErrorResponse')

// -----------------------------------------------
// @URL: GET + http://localhost:8080/api/posts/
// @desc: list all posts
// @access: Public
// -----------------------------------------------
exports.list = async (req, res) => {
  const data = await Post.find().populate('categoryId', 'name')
  res.status(200).json({
    success: true,
    data,
  })
}

// -----------------------------------------------
// @URL: GET + http://localhost:8080/api/posts/:slug
// @desc: get a single post
// @access: Public
// -----------------------------------------------
exports.read = async (req, res) => {
  const slug = req.params.slug
  //   const data = await Post.findById(id)

  const data = await Post.findOne({ slug }).populate('categoryId', 'name')

  if (!data) throw new ErrorResponse(404, 'Post not found')

  res.status(200).json({
    success: true,
    data,
  })
}

// -----------------------------------------------
// @URL: POST + http://localhost:8080/api/posts
// @desc: create new Post
// @access: Public
// -----------------------------------------------
exports.create = async (req, res) => {
  //   const post = req.body
  //   const data = await Post.create(post)

  // if (!req?.body?.title || !req?.body?.content)
  //   throw new ErrorResponse(400, 'Missing title or content field')

  const post = await Post.create(req.body)

  res.status(201).json({
    success: true,
    data: await post.populate('categoryId', 'name'),
  })
}

// -----------------------------------------------
// @URL: Put/PATCH + http://localhost:8080/api/posts/slug
// @desc: update a single post
// @access: Public
// -----------------------------------------------
exports.update = async (req, res) => {
  const slug = req.params.slug
  const data = await Post.updateOne({ slug }, req.body)

  //   const data = await Post.findByIdAndUpdate(id, req.body, {
  //     new: true,
  //     runValidators: true,
  //   })

  //   const post = await Post.findById(id)
  //   post.title = req.body.title
  //   post.content = req.body.content

  //   const data = await post.save()

  res.status(202).json({
    success: true,
    data,
  })
}

// -----------------------------------------------
// @URL: DELETE + http://localhost:8080/api/posts/:slug
// @desc: dElete a single post
// @access: Public
// -----------------------------------------------
exports.remove = async (req, res) => {
  const slug = req.params.slug
  const { deletedCount } = await Post.deleteOne({ slug })

  // const data = await Post.findOneAndDelete({ _id: id })
  //   const data = await Post.findByIdAndDelete(id)

  res.status(deletedCount ? 204 : 404).json({})
}
