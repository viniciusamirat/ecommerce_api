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

module.exports = {
  validateCreationProduct
}