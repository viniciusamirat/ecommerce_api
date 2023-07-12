const express = require('express')
const router = express.Router()
const userMidleware = require('../midlewares/userMidleware')
const productMidleware = require('../midlewares/productMidleware')
const productController = require('../controllers/productController')

const files = [
	{name: 'file1'},
	{name: 'file2'},
	{name: 'file3'},
	{name: 'file4'},
	{name: 'file5'},
]

router.post('/create'
	, userMidleware.validateTokenAdmin
	, productMidleware.validateCreationProduct
	, productController.createProduct
)

router.put('/updateImages/:id'
	, userMidleware.validateTokenAdmin
	, productController.upload.fields(files)
	, productController.updateImages
)

router.get('/products'
	, userMidleware.validateTokenAdmin
	, productController.getProducts
)

router.get('/:id'
	, userMidleware.validateTokenAdmin
	, productMidleware.validateGetProduct
	, productController.getProduct
)

module.exports = router