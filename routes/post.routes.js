const postCtrl = require('../controllers/post.controller')
const isAuth = require('../middlewares/isAuth')

const router = require('express').Router()

// URL : http://localhost:8080/api/posts/
router.route('/').get(postCtrl.list).post(isAuth, postCtrl.create)

// URL : http://localhost:8080/api/posts/:postId
router
  .route('/:slug')
  .get(postCtrl.read)
  .put(isAuth, postCtrl.update)
  .delete(isAuth, postCtrl.remove)

module.exports = router
