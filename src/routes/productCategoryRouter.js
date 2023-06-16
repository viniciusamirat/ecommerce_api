const express = require('express')
const router = express.Router()

const productCategoryController = require('../controllers/productCategoryController')
const productCategoryMidleware = require('../midlewares/productCategoryMidleware')
const userMidleware = require('../midlewares/userMidleware')

router.post('/create'
  ,userMidleware.validateTokenAdmin
  ,productCategoryMidleware.creationValidation
  ,productCategoryController.createCategory
)

router.put('/create'
  ,userMidleware.validateTokenAdmin
  ,productCategoryController.upload.single('file')
  ,productCategoryController.updateImagePath
)

module.exports = router