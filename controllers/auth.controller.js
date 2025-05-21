const { compare } = require('bcryptjs')
const User = require('../models/user.model')
const ErrorResponse = require('../utils/ErrorResponse')

exports.login = async (req, res) => {
  // Check for email and password was provided
  const { password, email } = req.body
  if (!password || !email)
    throw new ErrorResponse(401, 'Missing email or password field')
  // check if the user account exists
  const user = await User.findOne({ email })
  if (!user) throw new ErrorResponse(401, 'Invalid email or password')
  // Check if password is correct
  // const isMatch = await compare(password, user.password)
  // if (!isMatch) throw new ErrorResponse(401, 'Invalid email or password')
  const isMatch = await user.checkPassword(password)
  if (!isMatch) throw new ErrorResponse(401, 'Invalid email or password')
  // store the user id to the session
  req.session.id = user._id.toString()
  // req.session.email  =user.email
  // req.session.password = user.password
  // req.session.user = user;

  if (req.body?.rememberMe) {
    // Add the flag to the session
    req.session.rememberMe = req.body.rememberMe
    // update the cookie maxAge
    req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 30 // 30 days
  }

  res.status(200).send({
    success: true,
    message: 'Login success',
    data: await User.findOne({ _id: user._id.toString() }).select(
      '-password -__v',
    ),
  })
}
exports.logout = async (req, res) => {
  req.session = null
  res.status(200).send({
    success: true,
    message: 'Logout success',
  })
}
