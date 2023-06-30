const db = require('./connection')

const getPromotions = async ()=>{
  const result = await db.query(`
    select * from public.fc_get_promotions()
  `)
  return result.rows
}

module.exports = {
  getPromotions
}