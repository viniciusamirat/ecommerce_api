const wishlistModel = require('../models/wishlistModel')
const convertions = require('../utils/conversions/convertions')
const logs = require('../utils/files/logs')

const addItem = async (req, res)=>{
  try {
    const userId = parseInt(req.params.user)
    const productId = parseInt(req.params.product)

    const created = await wishlistModel.addItem(userId, productId)

    if (!created.data){
      return res.status(400).json({message: "Try again."})
    }

    return res.status(201).json()
  } catch (error) {
    logs.writeLog('wishlist.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const removeItem = async (req, res)=>{
  try {
    const userId = parseInt(req.params.user)
    const productId = parseInt(req.params.product)

    const removed = await wishlistModel.removeItem(userId, productId)

    if (!removed.data){
      return res.status(400).json({message: "Try again."})
    }

    return res.status(200).json()
  } catch (error) {
    logs.writeLog('wishlist.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const getItem = async (req, res)=>{
  try {
    const userId = parseInt(req.params.user)
    const productId = parseInt(req.params.product)

    const result = await wishlistModel.getItem(userId, productId)

    if (result.data === '[]'){
      return res.status(204).json()
    }

    return res.status(200).json(result)

  } catch (error) {
    logs.writeLog('wishlist.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const getItems = async (req, res)=>{
  try {
    const userId = parseInt(req.params.user)
    
    const result = await wishlistModel.getItems(userId)

    if (result.data === '[]'){
      return res.status(204).json()
    }

    return res.status(200).json(result)

  } catch (error) {
    logs.writeLog('wishlist.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

module.exports = {
  addItem
  , removeItem
  , getItem
  , getItems
}