const express = require('express')
const router = express.Router()
const userMidleware = require('../midlewares/userMidleware')
const userControlller = require('../controllers/userController')

router.post('/create', userMidleware.validateCreateUser, userControlller.createUser)

module.exports = router