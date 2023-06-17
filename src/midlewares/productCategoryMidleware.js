

const creationValidation = (req, res, next)=>{
  const { description } = req.body
  const validDesc = descriptionValidation(description)

  if (!validDesc){
    return res.status(400).json({message: "this description is not valid."})
  } else {
    return next()
  }
}

const updateValidation = (req, res, next)=>{
  const { description } = req.body
  const id = req.query.id

  const validDesc = descriptionValidation(description)
  const validId = idValidation(id)

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

  const validId = idValidation(id)

  if (!validId){
    return res.status(400).json('This id is not valid.')
  } else {
    return next()
  }
}

const descriptionValidation = (desc)=>{
  if ((desc === undefined) || (String(desc).trim() === '') || (desc === null)){
    return false
  } else {
    return true
  }
}

const idValidation = (id)=>{
  if ((id === undefined) || (isNaN(Number(id))) || (id === null)){
    return false
  } else {
    return true
  }
}

module.exports = {
  creationValidation,
  updateValidation,
  deleteValidation
}