require('dotenv').config()
const productModel = require('../models/productModel')
const promotionTyoeModel = require('../models/promotionTypeModel')
const productCategoryModel = require('../models/productCategoryModel')
const convertions = require('../utils/conversions/convertions')
const logs = require('../utils/files/logs')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const URL_API = process.env.URL_API

const storage = multer.diskStorage({
	destination: (req, file, cb)=>{
		cb(null, './public/products')
	},
	filename: (req, file, cb)=>{
		cb(null, `product-${Date.now()}${path.extname(file.originalname)}`)
	}
})

const upload = multer({
	storage,
	fileFilter: (req, file, cb)=>{
		const fileName = String(file.originalname)
		const countDot = fileName.split('.').length - 1

		if ((countDot > 1) || (countDot < 1)){
			cb("This file name is not valid.", false)
		}

		const extFile = path.extname(fileName)
		const extAllowed = ['.jpg', '.png', '.jpeg']

		if (!extAllowed.includes(extFile)){
			cb("This extension name is not valid.", false)
		}

		cb(null, true)
	}
})

const createProduct = async (req, res)=>{
	try {
		const idCategory = parseInt(req.body.idCategory)
		let idPromotion = parseInt(req.body.idPromotion)
		const description = convertions.toDescription(req.body.description)
		const price = convertions.toPrice(req.body.price)
		/**/

		if (isNaN(idPromotion)){
			idPromotion = null
		}

		if (idPromotion != null){
			const existsPromotion = await promotionTyoeModel.getExistsPromotion(idPromotion)
			if (!existsPromotion.data){
				return res.status(400).json({message: "This promotion does not exists."})
			}
		}

		const existsCategory = await productCategoryModel.getExistsCategory(idCategory)

		if (!existsCategory.data){
			return res.status(400).json({message: "This category does not exist."})
		}

		const createdRecord = await productModel.createProduct(
			idCategory
			, idPromotion
			, description
			, price
		)

		if (!createdRecord.data){
			return res.status(500).json()
		}

		return res.status(201).json()

	} catch (error) {
		logs.writeLog('product.txt', error.message)
		.catch((reject)=>{
			console.log(`Erro ao gravar log: ${reject}`)
		})
		return res.status(500).json()
	}
}

const updateImages = async (req, res)=>{
	try {
		const idProduct = parseInt(req.params.id)
		
		const image1 = req.files.file1 === undefined ? null : convertions.toPath(`${URL_API}/products/${req.files.file1[0].filename}`)
		const image2 = req.files.file2 === undefined ? null : convertions.toPath(`${URL_API}/products/${req.files.file2[0].filename}`)
		const image3 = req.files.file3 === undefined ? null : convertions.toPath(`${URL_API}/products/${req.files.file3[0].filename}`)
		const image4 = req.files.file4 === undefined ? null : convertions.toPath(`${URL_API}/products/${req.files.file4[0].filename}`)
		const image5 = req.files.file5 === undefined ? null : convertions.toPath(`${URL_API}/products/${req.files.file5[0].filename}`)

		const updatedRecord = await productModel.updateImages(
			idProduct
			, image1
			, image2
			, image3
			, image4
			, image5
		)

		if (!updatedRecord.data){
			return res.status(500).json()
		}

		return res.status(201).json()

	} catch (error) {
		logs.writeLog('product.txt', error.message)
		.catch((reject)=>{
			console.log(`Erro ao gravar log: ${reject}`)
		})
		return res.status(500).json()
	}
}

const getProducts = async (req, res)=>{
	try {
		const result = await productModel.getProducts()

		if (result.data === '[]'){
			return res.status(204).json()
		}

		return res.status(200).json(result)

	} catch (error) {
		logs.writeLog('product.txt', error.message)
		.catch((reject)=>{
			console.log(`Erro ao gravar log: ${reject}`)
		})
		return res.status(500).json()
	}
}

const getProduct = async (req, res)=>{
	try {
		const idProduct = parseInt(req.params.id)

		const result = await productModel.getProduct(idProduct)

		if (result.data === '[]'){
			return res.status(204).json()
		}

		return res.status(200).json(result)

	} catch (error) {
		logs.writeLog('product.txt', error.message)
		.catch((reject)=>{
			console.log(`Erro ao gravar log: ${reject}`)
		})
		return res.status(500).json()
	}
}

const updateProductDescription = async (req, res)=>{
	try {
		const id = parseInt(req.params.id)
		const desc = convertions.toDescription(req.body.description)

		const updatedRecord = await productModel.updateProductDescription(id, desc)

		if (!updatedRecord.data){
			return res.status(500).json()
		}

		return res.status(201).json()
	} catch (error) {
		logs.writeLog('product.txt', error.message)
		.catch((reject)=>{
			console.log(`Erro ao gravar log: ${reject}`)
		})
		return res.status(500).json()
	}
}

const updateProductCategory = async (req, res)=>{
	try {
		const idProduct = parseInt(req.body.idProduct)
		const idCategory = parseInt(req.body.idCategory)

		const updatedRecord = await productModel.updateProductCategory(idProduct, idCategory)

		if (!updatedRecord.data){
			return res.status(500).json()
		}

		return res.status(201).json()
	} catch (error) {
		logs.writeLog('product.txt', error.message)
		.catch((reject)=>{
			console.log(`Erro ao gravar log: ${reject}`)
		})
		return res.status(500).json()
	}
}

const updateProductPromotion = async (req, res)=>{
	try {
		const idProduct = parseInt(req.body.idProduct)
		const idPromotion = isNaN(parseInt(req.body.idPromotion)) ? null : parseInt(req.body.idPromotion)

		const updatedRecord = await productModel.updateProductPromotion(idProduct, idPromotion)

		if (!updatedRecord.data){
			return res.status(500).json()
		}

		return res.status(201).json()
	} catch (error) {
		logs.writeLog('product.txt', error.message)
		.catch((reject)=>{
			console.log(`Erro ao gravar log: ${reject}`)
		})
		return res.status(500).json()
	}
}

const updateProductPrice = async (req, res)=>{
	try {
		const idProduct = parseInt(req.params.id)
		const price = convertions.toPrice(req.body.price)

		const updatedRecord = await productModel.updateProductPrice(idProduct, price)

		if (!updatedRecord.data){
			return res.status(500).json()
		}

		return res.status(201).json()
	} catch (error) {
		logs.writeLog('product.txt', error.message)
		.catch((reject)=>{
			console.log(`Erro ao gravar log: ${reject}`)
		})
		return res.status(500).json()
	}
}

const deleteProduct = async (req, res)=>{
	try {
		const idProduct = parseInt(req.params.id)

		const recordBeforeDelete = await productModel.getProduct(idProduct)
		
		if (recordBeforeDelete.data != '[]'){
			const recordBeforeDeleteJson = JSON.parse(recordBeforeDelete.data)

			let images = []

			for (let i = 1; i <= 5; i++){

				let image = recordBeforeDeleteJson[0][`image_${i}`]

				if (image != 'null'){
					images.push(image.split('/').pop())
				}
			}

			for (let i = 0; i < images.length; i++){
				fs.unlink('./public/products/' + images[i], (err)=>{
					if (err){
						logs.writeLog('product.txt', 'err')
						.catch((reject)=>{
							consle.log(`Erro ao gravar log: ${reject}`)
						})
					}
				})
			}
			
			const deletedRecord = await productModel.deleteProduct(idProduct)

			if (!deletedRecord.data){
				return res.status(500).json()
			}

			return res.status(201).json()
		}

		return res.status(204).json()

	} catch (error) {
		logs.writeLog('product.txt', error.message)
		.catch((reject)=>{
			console.log(`Erro ao gravar log: ${reject}`)
		})
		return res.status(500).json()
	}
}

module.exports = { 
	createProduct
	, upload
	, updateImages
	, getProducts
	, getProduct
	, updateProductDescription
	, updateProductCategory
	, updateProductPromotion
	, updateProductPrice
	, deleteProduct
}