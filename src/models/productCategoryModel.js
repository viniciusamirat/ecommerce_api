const db = require('./connection')

const createCategory = async (category, imagePath)=>{
  const categoryCreated = await db.query(`
    select * from fc_create_category('${category}', '${imagePath}')
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
    select * from fc_get_image_category(${id})
  `)

  const deletedCategory = await db.query(`
    select public.fc_delete_category(${id})
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