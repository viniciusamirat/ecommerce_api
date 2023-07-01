const params = require('../utils/validations/params')

const validateGetPromotion = (req, res, next)=>{
  const validId = params.validateId(req.params.id)

  if (!validId){
    return res.status(400).json({message: "This id is not valid."})
  } else {
    return next()
  }
}

module.exports = {
  validateGetPromotion
}