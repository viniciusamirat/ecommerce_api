const express = require('express')
const router = express.Router()
const userMidleware = require('../midlewares/userMidleware')
const productMidleware = require('../midlewares/productMidleware')
const productController = require('../controllers/productController')

const files = ['file1','file2','file3','file4','file5',]

router.post('/create'
	, userMidleware.validateTokenAdmin
	//, productController.upload.fields(files)
	, productMidleware.validateCreationProduct
	, productController.createProduct
)

module.exports = router