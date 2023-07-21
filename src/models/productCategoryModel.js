const db = require('./connection')

const createCategory = async (category, imagePath)=>{
  const categoryCreated = await db.query(`
    select * from fc_create_category('${category}', '${imagePath}') as data
  `)
  return categoryCreated.rows[0]
}

const getCategories = async ()=>{
  const allCategories = await db.query(`
    select * from public.fc_get_categories() as data
  `)
  return allCategories.rows[0]
}

const updateImagePath = async (id, imagePath)=>{
  const pathUpdated = await db.query(`
    select * from public.fc_update_image_category('${imagePath}', ${id}) as data
  `)
  return pathUpdated.rows[0]
}

const updateCategory = async (id, desc)=>{
  const updatedCategory = await db.query(`
    select * from fc_update_description_category('${desc}', ${id}) as data
  `)
  return updatedCategory.rows[0]
}

const deleteCategory = async (id)=>{
  const result = await db.query(`
    select * from fc_get_image_category(${id}) as data
  `)

  const deletedCategory = await db.query(`
    select public.fc_delete_category(${id}) as data
  `)
  return result
}

const getExistsCategory = async (id)=>{
  const result = await db.query(`
    select public.fc_get_exists_category(${id}) as data
  `)
  return result.rows[0]
}

module.exports = {
  createCategory,
  updateImagePath,
  updateCategory,
  deleteCategory,
  getCategories,
  getExistsCategory
}