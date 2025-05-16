const router = require('express').Router()

router.use('/api/posts', require('./post.routes'))
router.use('/api/categories', require('./category.routes'))
router.use('/api/users', require('./user.routes'))

module.exports = router
