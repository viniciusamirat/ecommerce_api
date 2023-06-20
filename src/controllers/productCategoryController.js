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

const upload = multer({storage, fileFilter: (req, file, cb)=>{
  const fileName = String(file.originalname)
  const countDot = fileName.split('.').length - 1

  if ((countDot > 1) || (countDot < 1)){
    return cb('This file name is not valid.', false)
  }
  
  const extFile = path.extname(fileName)
  const extAllowed = ['.jpg', '.png', '.jpeg']

  if (!extAllowed.includes(extFile)){
    return cb('This extension name is not valid.',false)
  }

  return cb(null, true)
}})

const createCategory = async (req, res)=>{
  try {
    const desc = String(req.body.description).trim().toLowerCase()

    await produtCategoryModel.createCategory(desc)

    return res.status(201).json()
  } catch (error) {
    logs.writeLog('productCategory.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const updateImagePath = async (req, res)=>{
  try {
    const id = Number(req.query.id)
    const imagePath = `${URL_API}/categories/${req.file.filename}` 

    await produtCategoryModel.updateImagePath(id, imagePath)

    return res.status(201).json()
  } catch (error) {
    logs.writeLog('productCategory.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const updateCategory = async (req, res)=>{
  try{
    const desc = String(req.body.description).trim().toLowerCase()
    const id = Number(req.query.id)

    await produtCategoryModel.updateCategory(id, desc)

    return res.status(201).json()
  } catch (error){
    logs.writeLog('productCategory.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const deleteCategory = async (req, res)=>{
  try {
    const id = Number(req.params.id)

    const deletedCategory = await produtCategoryModel.deleteCategory(id)

    return res.status(200).json()
  } catch (error) {
    logs.writeLog('productCategory.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

module.exports = {
  createCategory,
  upload,
  updateImagePath,
  updateCategory,
  deleteCategory
}