const produtCategoryModel = require('../models/productCategoryModel')

const createCategory = async (req, res)=>{
  try {
    const desc = String(req.body.description).trim().toLowerCase()

    await produtCategoryModel.createCategory(desc)

    return res.status(201).json()
  } catch (error) {
    console.log(error.message)
    return res.status(500).json()
  }
}

module.exports = {
  createCategory
}