const catCtrl = require('../controllers/category.controller')

const router = require('express').Router()

// URL : http://localhost:8080/api/categories/
router.route('/').get(catCtrl.list).post(catCtrl.create)

// URL : http://localhost:8080/api/categories/:catId/posts
router.get('/:catId/posts', catCtrl.listPosts)

// URL : http://localhost:8080/api/categories/:catId
router
  .route('/:catId')
  .get(catCtrl.read)
  .put(catCtrl.update)
  .delete(catCtrl.remove)

module.exports = router
