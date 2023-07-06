const params = require('../utils/validations/params')

const validateGetPromotion = (req, res, next)=>{
  const validId = params.validateId(req.params.id)

  if (!validId){
    return res.status(400).json({message: "This id is not valid."})
  } else {
    return next()
  }
}

const validateCreatePromotion = (req, res, next)=>{
  const desc = req.body.description
  const percent = req.body.percentage
  const active = req.body.active
  
  const validDesc = params.validateDescription(desc)
  const validPercent = params.validatePercentage(percent)
  const validActive = params.validateBoolean(active)

  if (!validDesc){
    return res.status(400).json({messagem: "This description is not valid."})
  } else if (!validPercent){
    return res.status(400).json({message: "This percentage is not valid."})
  } else if (!validActive){
    return res.status(400).json({message: "This status is not valid."})
  } else {
    return next()
  }
}

const validateDeletePromotion = (req, res, next)=>{
  const idPromotion = req.params.id

  const validId = params.validateId(idPromotion)

  if (!validId){
    return res.status(400).json({message: "This id is not valid."})
  } else {
    return next()
  }
}

module.exports = {
  validateGetPromotion
  , validateCreatePromotion
  , validateDeletePromotion
}