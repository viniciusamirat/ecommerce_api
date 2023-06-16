const db = require('./connection')

const createCategory = async (category)=>{
  const categoryCreated = await db.query(`
    insert into public.ec_product_category (description) values ('${category}')
  `)
  return categoryCreated
}

const updateImagePath = async (id, imagePath)=>{
  const pathUpdated = await db.query(`
    update public.ec_product_category set image_1 = '${imagePath}' where pk_product_category = ${id}
  `)
  return pathUpdated
}

module.exports = {
  createCategory,
  updateImagePath
}