const catCtrl = require('../controllers/category.controller')
const ErrorResponse = require('../utils/ErrorResponse')

const router = require('express').Router()
const isAuth = require('../middlewares/isAuth')

router.use(isAuth)
router.use((req, res, next) => {
  if (req.user?.role !== 'admin')
    throw new ErrorResponse(401, 'You are not authorized to access this route')
  next()
})

// URL : http://localhost:8080/api/categories/
router.route('/').get(catCtrl.list).post(catCtrl.create)

// URL : http://localhost:8080/api/categories/:catId/posts
router.get('/:catId/posts', catCtrl.listPosts)

// URL : http://localhost:8080/api/categories/:catId
router
  .route('/:catId')
  .get(catCtrl.read)
  .put(isAuth, catCtrl.update)
  .delete(isAuth, catCtrl.remove)

module.exports = router
