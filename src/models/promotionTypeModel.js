const db = require('./connection')

const getPromotions = async ()=>{
  const result = await db.query(`
    select * from public.fc_get_promotions() as data
  `)
  return result.rows[0]
}

const getPromotion = async (idPromotion)=>{
  const result = await db.query(`
    select public.fc_get_promotion(${idPromotion}) as data
  `)
  return result.rows[0]
}

const createPromotion = async (description, percentage, active)=>{
  const created = await db.query(`
    select public.fc_create_promotion_type('${description}', ${percentage}, ${active}) as data
  `)
  return created.rows[0]
}

const deletePromotion = async (idPromotion)=>{
  const deletedRecord = await db.query(`
    select public.fc_delete_promotion(${idPromotion})
  `)
  return deletedRecord
}

module.exports = {
  getPromotions
  , getPromotion
  , createPromotion
  , deletePromotion
}