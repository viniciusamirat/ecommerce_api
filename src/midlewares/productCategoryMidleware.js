

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

  const validDesc = descriptionValidation(description)

  if(!validDesc){
    return res.status(400).json({message: "This description is not valid."})
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

module.exports = {
  creationValidation,
  updateValidation
}