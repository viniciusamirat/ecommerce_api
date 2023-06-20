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

const updateCategory = async (id, desc)=>{
  const updatedCategory = await db.query(`
    update public.ec_product_category set description = '${desc}' where pk_product_category = ${id}
  `)
  return updatedCategory
}

const deleteCategory = async (id)=>{
  const result = await db.query(`
    select image_1 from public.ec_product_category where pk_product_category = ${id}
  `)

  const deletedCategory = await db.query(`
    delete from public.ec_product_category where pk_product_category = ${id}
  `)
  return result
}

module.exports = {
  createCategory,
  updateImagePath,
  updateCategory,
  deleteCategory
}