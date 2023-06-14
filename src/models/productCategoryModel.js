const db = require('./connection')

const createCategory = async (category)=>{
  const categoryCreated = await db.query(`
    insert into public.ec_product_category (description) values ('${category}')
  `)
  return categoryCreated
}

module.exports = {
  createCategory
}