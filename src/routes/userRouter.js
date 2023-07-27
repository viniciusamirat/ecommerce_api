const express = require('express')
const router = express.Router()
const userMidleware = require('../midlewares/userMidleware')
const userController = require('../controllers/userController')

router.post('/create', userMidleware.validateCreateUser, userController.createUser)

router.get('/login', userMidleware.validateLogin, userController.getUserForLogin)

module.exports = router