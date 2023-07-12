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

module.exports = {
	createProduct
}