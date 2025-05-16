const Category = require('../models/category.model')
const Post = require('../models/post.model')
const ErrorResponse = require('../utils/ErrorResponse')

// -----------------------------------------------
// @URL: GET + http://localhost:8080/api/categories/
// @desc: list all categories
// @access: Public
// -----------------------------------------------
exports.list = async (req, res) => {
  const categories = await Category.find()
  res.status(200).json({
    success: true,
    data: categories,
  })
}
// -----------------------------------------------
// @URL: GET + http://localhost:8080/api/categories/:catId
// @desc: list a single category
// @access: Public
// -----------------------------------------------
exports.read = async (req, res) => {
  const catId = req.params.catId
  const category = await Category.findOne({ _id: catId })
  res.status(200).json({
    success: true,
    data: category,
  })
}

// -----------------------------------------------
// @URL: POST + http://localhost:8080/api/categories/
// @desc: Create a new category
// @access: Public
// -----------------------------------------------
exports.create = async (req, res) => {
  if (!req.body.name) throw new ErrorResponse(400, 'Missing name field')
  const category = await Category.create(req.body)

  res.status(201).json({
    success: true,
    data: category,
  })
}

// -----------------------------------------------
// @URL: PUT + http://localhost:8080/api/categories/:catId
// @desc: update a single category
// @access: Public
// -----------------------------------------------
exports.update = async (req, res) => {
  const catId = req.params.catId
  if (!req.body.name) throw new ErrorResponse(400, 'Missing name field')
  const category = await Category.findByIdAndUpdate(catId, req.body)
  res.status(202).json({
    success: true,
    data: category,
  })
}

// -----------------------------------------------
// @URL: DELETE + http://localhost:8080/api/categories/:catId
// @desc: delete a single category
// @access: Public
// -----------------------------------------------
exports.remove = async (req, res) => {
  const catId = req.params.catId
  const { deletedCount } = await Category.deleteOne({ _id: catId })
  res.status(deletedCount ? 204 : 404).json({})
}

// -----------------------------------------------
// @URL: DELETE + http://localhost:8080/api/categories/:catId/posts
// @desc: list all posts that belong to a specific category
// @access: Public
// -----------------------------------------------
exports.listPosts = async (req, res) => {
  const catId = req.params.catId
  const posts = await Post.find({ categoryId: catId }).populate(
    'categoryId',
    'name',
  )
  res.status(200).json({
    success: true,
    data: posts,
  })
}
