const params = require('../utils/validations/params')

const creationValidation = (req, res, next)=>{
  const { description } = req.body
  const validDesc = params.validateDescription(description)

  if (!validDesc){
    return res.status(400).json({message: "this description is not valid."})
  } else {
    return next()
  }
}

const updateValidation = (req, res, next)=>{
  const { description } = req.body
  const id = req.query.id

  const validDesc = params.validateDescription(description)
  const validId = params.validateId(id)

  if(!validDesc){
    return res.status(400).json({message: "This description is not valid."})
  } else if(!validId){
    return res.status(400).json({message: "This id is not valid."})
  }else {
    return next()
  }
}

const deleteValidation = (req, res, next)=>{
  const id = req.params.id

  const validId = params.validateId(id)

  if (!validId){
    return res.status(400).json('This id is not valid.')
  } else {
    return next()
  }
}

module.exports = {
  creationValidation,
  updateValidation,
  deleteValidation
}