const User = require('../models/user.model')
module.exports = async (req, res, next) => {
  if (req?.session?.id) {
    const user = await User.findOne({ _id: req.session?.id })
    if (user) {
      req.user = user
      req.isLogin = true
      next()
    } else {
      req.session = null
      req.isLogin = false
      res.status(401).json({ error: true, message: 'Unauthorized' })
    }
  } else {
    res.status(401).json({ error: true, message: 'Unauthorized' })
  }
}
