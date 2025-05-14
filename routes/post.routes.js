const postCtrl = require('../controllers/post.controller')

const router = require('express').Router()

// URL : http://localhost:8080/api/posts/
router.route('/').get(postCtrl.list).post(postCtrl.create)

// URL : http://localhost:8080/api/posts/:postId
router
  .route('/:slug')
  .get(postCtrl.read)
  .put(postCtrl.update)
  .delete(postCtrl.remove)

module.exports = router
