const express = require('express')
const router = express.Router()
const wishlistController = require('../controllers/wishlistController')
const wishlistMidleware = require('../midlewares/wishlistMidleware')
const userMidleware = require('../midlewares/userMidleware')

router.post('/add/:user/:product'
  , userMidleware.validateTokenCustomer
  , wishlistMidleware.validateAddItem
  , wishlistController.addItem
)

router.delete('/remove/:user/:product'
  , userMidleware.validateTokenCustomer
  , wishlistMidleware.validateRemoveItem
  , wishlistController.removeItem
)

router.get('/item/:user/:product'
  , userMidleware.validateTokenAdmin
  , wishlistMidleware.validateGetItem
  , wishlistController.getItem
)

router.get('/items/:user'
  , userMidleware.validateTokenAdmin
  , wishlistMidleware.validateGetItems
  , wishlistController.getItems
)

module.exports = router