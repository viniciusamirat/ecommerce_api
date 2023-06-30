const express = require('express')
const router = express.Router()

const promotionTypeController = require('../controllers/promotionTypeController')
const userMidleware = require('../midlewares/userMidleware')

router.get('/promotions'
  ,userMidleware.validateTokenAdmin
  ,promotionTypeController.getPromotions
)

module.exports = router