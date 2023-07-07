const express = require('express')
const router = express.Router()

const promotionTypeController = require('../controllers/promotionTypeController')
const userMidleware = require('../midlewares/userMidleware')
const promotionTypeMidleware = require('../midlewares/promotionTypeMidleware')

router.get('/promotions'
  , userMidleware.validateTokenAdmin
  , promotionTypeController.getPromotions
)

router.get('/:id'
  , userMidleware.validateTokenAdmin
  , promotionTypeMidleware.validateGetPromotion
  , promotionTypeController.getPromotion
)

router.post('/create'
  , userMidleware.validateTokenAdmin
  , promotionTypeMidleware.validateCreatePromotion
  , promotionTypeController.createPromotion
)

router.delete('/delete/:id'
  , userMidleware.validateTokenAdmin
  , promotionTypeMidleware.validateDeletePromotion
  , promotionTypeController.deletePromotion
)

router.put('/updateDescription/:id'
  , userMidleware.validateTokenAdmin
  , promotionTypeMidleware.validateUpdatePromotionDescription
  , promotionTypeController.updatePromotionDescription
)

router.put('/updatePercentage/:id'
  , userMidleware.validateTokenAdmin
  , promotionTypeMidleware.validateUpdatePromotionPercentage
  , promotionTypeController.updatePromotionPercentage
)

router.put('/updateActive/:id'
  , userMidleware.validateTokenAdmin
  , promotionTypeMidleware.validateUpdatePromotionActive
  , promotionTypeController.updatePromotionActive
)

module.exports = router