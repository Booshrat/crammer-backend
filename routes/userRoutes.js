const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')

router.get('/', usersController.index)
router.post('/login', usersController.login)
router.post('/register', usersController.register)
router.get('/:username', usersController.show)
router.delete('/:id', usersController.destroy)
router.patch('/:id', usersController.update)

module.exports = router
