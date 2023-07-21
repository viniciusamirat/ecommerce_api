require('dotenv').config()
const fs = require('fs')

const produtCategoryModel = require('../models/productCategoryModel')
const multer = require('multer')
const path = require('path')
const logs = require('../utils/files/logs')
const convertions = require('../utils/conversions/convertions')

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
    const desc = convertions.toDescription(req.body.description)
    const imagePathDefault = `${URL_API}/categories/category.png` 

    const createdRecord = await produtCategoryModel.createCategory(desc, imagePathDefault)

    if (!createdRecord.data){
      return res.status(500).json()
    }

    return res.status(201).json()
  } catch (error) {
    logs.writeLog('productCategory.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const getCategories = async (req, res)=>{
  try {
    
    const allCategories = await produtCategoryModel.getCategories()

    if (allCategories.data === '[]'){
      return res.status(204).json()
    }

    const records = allCategories.data

    return res.status(200).json(records)

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
    const id = parseInt(req.query.id)
    const imagePath = convertions.toPath(`${URL_API}/categories/${req.file.filename}`)

    const updatedRecord = await produtCategoryModel.updateImagePath(id, imagePath)

    if (!updatedRecord.data){
      return res.status(500).json()
    }

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
    const desc = convertions.toDescription(req.body.description)
    const id = parseInt(req.query.id)

    const updatedRecord = await produtCategoryModel.updateCategory(id, desc)

    if (!updatedRecord.data){
      return res.status(500).json()
    }

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
    const id = parseInt(req.params.id)

    const recordCategoryDeleted = await produtCategoryModel.deleteCategory(id)

    if (recordCategoryDeleted.rowCount === 0) {
      return res.status(204).json()
    }

    const filePath = recordCategoryDeleted.rows[0].r_image

    if ((filePath != null) || (filePath != undefined)){
      const fileName = filePath.split('/').pop()

      fs.unlink(`./public/categories/${fileName}`, (err)=>{
        if (!err) return console.log(err)
      })
    }

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
  deleteCategory,
  getCategories
}