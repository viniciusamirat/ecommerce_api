const db = require('./connection')

const createProduct = async (
	idCategory
	, idPromotion
	, description
	, price
)=>{
	const createdRecord = await db.query(`
		select public.fc_create_product(${idCategory},${idPromotion},'${description}',${price}) as data
	`)
	return createdRecord.rows[0]
}

const updateImages = async (id, image1, image2, image3, image4, image5)=>{
	const updatedRecord = await db.query(`
		select public.fc_update_product_images(${id},'${image1}','${image2}','${image3}','${image4}','${image5}') as data
	`)
	return updatedRecord.rows[0]
}

const getProducts = async ()=>{
	const result = await db.query(`
		select public.fc_get_products() as data
	`)
	return result.rows[0]
}

const getProduct = async (id)=>{
	const result = await db.query(`
		select public.fc_get_product(${id}) as data
	`)
	return result.rows[0]
}

const updateProductDescription = async (id, description)=>{
	const updatedRecord = await db.query(`
		select public.fc_update_product_description(${id}, '${description}') as data
	`)
	return updatedRecord.rows[0]
}

const updateProductPrice = async (id, price)=>{
	const updatedRecord = await db.query(`
		select public.fc_update_product_price(${id}, ${price}) as data
	`)
	return updatedRecord.rows[0]
}

const updateProductCategory = async (idProduct, idCategory)=>{
	const updatedRecord = await db.query(`
		select public.fc_update_product_category(${idProduct}, ${idCategory}) as data
	`)
	return updatedRecord.rows[0]
}

const updateProductPromotion = async (idProduct, idPromotion)=>{
	const updatedRecord = await db.query(`
		select public.fc_update_product_promotion(${idProduct}, ${idPromotion}) as data
	`)
	return updatedRecord.rows[0]
}

const deleteProduct = async (id)=>{
	const deletedRecord = await db.query(`
		select public.fc_delete_product(${id}) as data
	`)
	return deletedRecord.rows[0]
}

module.exports = {
	createProduct
	, updateImages
	, getProducts
	, getProduct
	, updateProductDescription
	, updateProductPrice
	, updateProductCategory
	, updateProductPromotion
	, deleteProduct
}