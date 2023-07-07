const db = require('./connection')

const createProduct = async (
	idCategory
	, idPromotion
	, description
	, price
	, image1
	, image2
	, image3
	, image4
	, image5
)=>{
	const createdRecord = await db.query(`
		select public.fc_create_product(${idCategory},${idPromotion},'${description}',${price},'${image1}','${image2}','${image3}','${image4}','${image5}') as data
	`)
	return createdRecord.rows[0]
}



module.exports = {
	createProduct
}