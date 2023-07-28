const db = require('./connection')

const addItem = async (userId, productId)=>{
  const created = await db.query(`
    select public.fc_wishlist_add(${userId}, ${productId}) as data
  `)
  
  return created.rows[0]
}

const removeItem = async (userId, productId)=>{
  const removed = await db.query(`
    select public.fc_wishlist_remove(${userId}, ${productId}) as data
  `)
  
  return removed.rows[0]
}

const getItem = async (userId, productId)=>{
  const item = await db.query(`
    select public.fc_get_wishlist_item(${userId}, ${productId}) as data
  `)
  return item.rows[0]
}

const getItems = async (userId)=>{
  const items = await db.query(`
    select public.fc_get_wishlist_items(${userId}) as data
  `)
  return items.rows[0]
}

module.exports = {
  addItem
  , removeItem
  , getItem
  , getItems
}