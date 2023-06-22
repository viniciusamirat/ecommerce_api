const db = require('./connection')

const createCategory = async (category)=>{
  const categoryCreated = await db.query(`
    select * from fc_create_category('${category}')
  `)
  return categoryCreated
}

const getCategories = async ()=>{
  const allCategories = db.query(`
    select * from fc_get_categories() as (idCategory integer, description text, image text)
  `)
  return allCategories
}

const updateImagePath = async (id, imagePath)=>{
  const pathUpdated = await db.query(`
    select * from fc_update_image_category('${imagePath}', ${id})
  `)
  return pathUpdated
}

const updateCategory = async (id, desc)=>{
  const updatedCategory = await db.query(`
    select * from fc_update_description_category('${desc}', ${id})
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
  deleteCategory,
  getCategories
}