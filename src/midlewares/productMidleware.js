const params = require('../utils/validations/params')

const validateCreationProduct = (req, res, next)=>{
  const idCategory = req.body.idCategory
  let idPromotion = req.body.idPromotion
  const description = req.body.description
  const price = req.body.price

  const validIdCategory = params.validateId(idCategory)
  let validIdPromotion = false

  if ((params.validateId(idPromotion)) || (idPromotion === null)){
    validIdPromotion = true
  } else {
    return res.status(400).json({message: "This idPromotion is not valid."})
  }

  const validDesc = params.validateDescription(description)
  const validPrice = params.validatePrice(price)

  if (!validIdCategory){
    return res.status(400).json({message: "This idcategory is not valid."})
  } else if (!validDesc){
    return res.status(400).json({message: "This description is not valid."})
  } else if (!validPrice){
    return res.status(400).json({message: "This price is not valid."})
  } else {
    return next()
  }
}

const validateGetProduct = (req, res, next)=>{
  const id = req.params.id

  const validId = params.validateId(id)

  if (!validId){
    return res.status(400).json({message: "This id is not valid."})
  } else {
    return next()
  }
}

const validateUpdateDescription = (req, res, next)=>{
  const id = req.params.id
  const desc = req.body.description

  const validId = params.validateId(id)
  const validDesc = params.validateDescription(desc)

  if (!validId){
    return res.status(400).json({message: "This id is not valid."})
  } else if (!validDesc){
    return res.status(400).json({message: "This description is not valid."})
  }

  return next()
}

const validateUpdateCategory = (req, res, next)=>{
  const idProduct = req.body.idProduct
  const idCategory = req.body.idCategory

  const validProduct = params.validateId(idProduct)
  const validCategory = params.validateId(idCategory)

  if (!validProduct){
    return res.status(400).json({message: "This product id is not valid."})
  } else if (!validCategory){
    return res.status(400).json({message: "This category id is not valid."})
  }

  return next()
}

const validateUpdatePromotion = (req, res, next)=>{
  const idProduct = req.body.idProduct
  const idPromotion = req.body.idPromotion

  const validProduct = params.validateId(idProduct)
  let validPromotion = false

  if ((params.validateId(idPromotion)) || (idPromotion === null)){
    validPromotion = true
  } else {
    return res.status(400).json({message: "This promotion id is not valid."})
  }

  if (!validProduct){
    return res.status(400).json({message: "This product id is not valid."})
  }

  return next()
}

const validateUpdatePrice = (req, res, next)=>{
  const idProduct = req.params.id
  const price = req.body.price

  const validProduct = params.validateId(idProduct)
  const validPrice = params.validatePrice(price)
  
  if (!validProduct){
    return res.status(400).json({message: "This product id is not valid."})
  } else if (!validPrice){
    return res.status(400).json({message: "This price is not valid."})
  }

  return next()
}

const validateDeleteProduct = (req, res, next)=>{
  const idProduct = req.params.id

  const validProduct = params.validateId(idProduct)
  
  if (!validProduct){
    return res.status(400).json({message: "This product id is not valid."})
  }
  return next()
}

module.exports = {
  validateCreationProduct
  , validateGetProduct
  , validateUpdateDescription
  , validateUpdateCategory
  , validateUpdatePromotion
  , validateUpdatePrice
  , validateDeleteProduct
}