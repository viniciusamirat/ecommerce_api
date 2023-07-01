const express = require('express')
const router = express.Router()

const promotionTypeController = require('../controllers/promotionTypeController')
const userMidleware = require('../midlewares/userMidleware')
const promotionTypeMidleware = require('../midlewares/promotionTypeMidleware')

router.get('/promotions'
  ,userMidleware.validateTokenAdmin
  ,promotionTypeController.getPromotions
)

router.get('/:id'
  ,userMidleware.validateTokenAdmin
  ,promotionTypeMidleware.validateGetPromotion
  ,promotionTypeController.getPromotion
)

router.post('/create'
  ,userMidleware.validateTokenAdmin
  ,promotionTypeController.createPromotion
)

module.exports = router