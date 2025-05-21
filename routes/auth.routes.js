const router = require('express').Router()
const { login, logout } = require('../controllers/auth.controller')
const { create } = require('../controllers/user.controller')

router.post('/login', login)
router.all('/logout', logout)
router.post('/register', create)

module.exports = router
