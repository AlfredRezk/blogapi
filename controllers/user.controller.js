const User = require('../models/user.model')
const ErrorResponse = require('../utils/ErrorResponse')
const { genSalt, hash } = require('bcryptjs')
const passwordEncrypt = require('../utils/passwordEncrypt')

function sendResponse(res, status, data) {
  res.status(status).json({
    success: true,
    data,
  })
}
// -----------------------------------------------
// @URL: GET + http://localhost:8080/api/users/
// @desc: list all users
// @access: Public
// -----------------------------------------------
exports.list = async (req, res) => {
  const data = await User.find()
  sendResponse(res, 200, data)
}

// -----------------------------------------------
// @URL: GET + http://localhost:8080/api/users/:userId
// @desc: get a single user
// @access: Public
// -----------------------------------------------
exports.read = async (req, res) => {
  const id = req.params.userId
  //   const data = await Post.findById(id)
  const data = await User.findOne({ _id: id })
  if (!data) throw new ErrorResponse(404, 'User not found')
  sendResponse(res, 200, data)
}

// -----------------------------------------------
// @URL: POST + http://localhost:8080/api/users
// @desc: create new User
// @access: Public
// -----------------------------------------------
exports.create = async (req, res) => {
  //   const post = req.body
  //   const data = await Post.create(post)

  if (!req.body.email || !req.body.password)
    throw new ErrorResponse(400, 'Missing email or password field')

  // Encrypt the user password

  // const salt = await genSalt(12)
  // const hashedPassword = await hash(req.body.password, salt)
  // req.body.password = hashedPassword

  // Using Crypto
  // const hashedPassword = passwordEncrypt(req.body.password)
  // req.body.password = hashedPassword
  // Create the user
  const data = await User.create(req.body)
  sendResponse(res, 201, data)
}

// -----------------------------------------------
// @URL: Put/PATCH + http://localhost:8080/api/users/:userId
// @desc: update a single user
// @access: Public
// -----------------------------------------------
exports.update = async (req, res) => {
  const id = req.params.userId
  const data = await User.updateOne({ _id: id }, req.body)
  sendResponse(res, 202, data)
}

// -----------------------------------------------
// @URL: DELETE + http://localhost:8080/api/users/:useId
// @desc: delete a single user
// @access: Public
// -----------------------------------------------
exports.remove = async (req, res) => {
  const userId = req.params.userId
  const { deletedCount } = await User.deleteOne({ _id: userId })
  sendResponse(res, deletedCount ? 204 : 404, {})
}
