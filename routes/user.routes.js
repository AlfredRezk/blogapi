const userCtlr = require('../controllers/user.controller')
const router = require('express').Router()

// URL : http://localhost:8080/api/users/
router.route('/').get(userCtlr.list).post(userCtlr.create)

// URL : http://localhost:8080/api/users/:userId
router
  .route('/:userId')
  .get(userCtlr.read)
  .put(userCtlr.update)
  .delete(userCtlr.remove)

module.exports = router
