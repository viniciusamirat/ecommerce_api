const express = require('express')
const router = express.Router()

const productCategoryController = require('../controllers/productCategoryController')
const productCategoryMidleware = require('../midlewares/productCategoryMidleware')
const userMidleware = require('../midlewares/userMidleware')

router.post('/create'
  ,userMidleware.validateTokenAdmin
  ,productCategoryMidleware.creationValidation
  ,productCategoryController.createCategory)


module.exports = router