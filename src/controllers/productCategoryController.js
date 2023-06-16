require('dotenv').config()

const produtCategoryModel = require('../models/productCategoryModel')
const multer = require('multer')
const path = require('path')

const URL_API = process.env.URL_API

const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, './public/categories/')
  },
  filename: (req, file, cb)=>{
    cb(null, 'category-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage})

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

const updateImagePath = async (req, res)=>{
  try {
    const id = Number(req.query.id)
    const imagePath = `${URL_API}/categories/${req.file.filename}` 

    await produtCategoryModel.updateImagePath(id, imagePath)

    return res.status(200).json()
  } catch (error) {
    console.log(error.message)
    return res.status(500).json()
  }
}

module.exports = {
  createCategory,
  upload,
  updateImagePath
}