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

router.put('/update-image'
  ,userMidleware.validateTokenAdmin
  ,productCategoryController.upload.single('file')
  ,productCategoryController.updateImagePath
)

router.put('/update-description'
  ,userMidleware.validateTokenAdmin
  ,productCategoryMidleware.updateValidation
  ,productCategoryController.updateCategory
)

router.delete('/delete-category/:id'
  ,productCategoryMidleware.deleteValidation
  ,productCategoryController.deleteCategory
)

module.exports = router