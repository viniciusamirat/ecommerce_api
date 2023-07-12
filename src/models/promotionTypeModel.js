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

const updatePromotionDescription = async (idPromotion, description)=>{
  const updatedRecord = await db.query(`
    select public.fc_update_promotion_description(${idPromotion}, '${description}') as data
  `)
  return updatedRecord.rows[0]
}

const updatePromotionPercentage = async (idPromotion, percentage)=>{
  const updatedRecord = await db.query(`
    select public.fc_update_promotion_percentage(${idPromotion}, ${percentage}) as data
  `)
  return updatedRecord.rows[0]
}

const updatePromotionActive = async (idPromotion, active)=>{
  const updatedRecord = await db.query(`
    select public.fc_update_promotion_active(${idPromotion}, ${active}) as data
  `)
  return updatedRecord.rows[0]
}

const getExistsPromotion = async (id)=>{
  const result = await db.query(`
    select public.fc_get_exists_promotion(${id}) as data
  `)
  return result.rows[0]
}

module.exports = {
  getPromotions
  , getPromotion
  , createPromotion
  , deletePromotion
  , updatePromotionDescription
  , updatePromotionPercentage
  , updatePromotionActive
  , getExistsPromotion
}