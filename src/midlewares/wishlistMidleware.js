const params = require('../utils/validations/params')

const validateAddItem = (req, res, next)=>{
  const validUser = params.validateId(req.params.user)
  const validProduct = params.validateId(req.params.product)

  if ((!validUser) || (!validProduct)){
    return res.status(400).json({message: "This id is not valid."})
  }

  return next()
}

const validateRemoveItem = (req, res, next)=>{
  const validUser = params.validateId(req.params.user)
  const validProduct = params.validateId(req.params.product)

  if ((!validUser) || (!validProduct)){
    return res.status(400).json({message: "This id is not valid."})
  }

  return next()
}

const validateGetItem = (req, res, next)=>{
  const validUser = params.validateId(req.params.user)
  const validProduct = params.validateId(req.params.product)

  if ((!validUser) || (!validProduct)){
    return res.status(400).json({message: "This id is not valid."})
  }

  return next()
}

const validateGetItems = (req, res, next)=>{
  const validUser = params.validateId(req.params.user)

  if (!validUser){
    return res.status(400).json({message: "This id is not valid."})
  }

  return next()
}

module.exports = {
  validateAddItem
  , validateRemoveItem
  , validateGetItem
  , validateGetItems
}