const promotionTypeModel = require('../models/promotionTypeModel')
const logs = require('../utils/files/logs')
const convertions = require('../utils/conversions/convertions')

const getPromotions = async (req, res)=>{
  try {
    const result = await promotionTypeModel.getPromotions()

    if (result.data == '[]'){
      return res.status(204).json()
    }

    return res.status(200).json(result)
  } catch (error) {
    logs.writeLog('promotionType.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const getPromotion = async (req, res)=>{
  try{
    const id = parseInt(req.params.id)

    const result = await promotionTypeModel.getPromotion(id)

    if (result.data == '[]'){
      return res.status(204).json()
    }

    return res.status(200).json(result)
  }catch (error){
    logs.writeLog('promotionType.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const createPromotion = async (req, res)=>{
  try {
    const { description, percentage, active } = req.body

    const desc = convertions.toDescription(description)
    const percent = convertions.toPercentage(percentage)
    const status = convertions.toBoolean(active)
    
    const result = await promotionTypeModel.createPromotion(desc, percent, status)

    if (!result.data){
      return res.status(500).json()
    }

    return res.status(200).json()
  } catch (error) {
    logs.writeLog('promotionType.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const deletePromotion = async (req, res)=>{
  try {
    const idPromotion = parseInt(req.params.id)

    const deletedRecord = await promotionTypeModel.deletePromotion(idPromotion)

    return res.status(200).json()

  } catch (error) {
    logs.writeLog('promotionType.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar logs: ${reject}`)
    })
    return res.status(500).json()
  }
}

const updatePromotionDescription = async (req, res)=>{
  try {
    const description = convertions.toDescription(req.body.description)
    const idPromotion = parseInt(req.params.id)

    const updatedRecord = await promotionTypeModel.updatePromotionDescription(idPromotion, description)

    if (!updatedRecord.data){
      return res.status(500).json()
    }

    return res.status(201).json()

  } catch (error) {
    logs.writeLog('promotionType.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar logs: ${reject}`)
    })
    return res.status(500).json()
  }
}

const updatePromotionPercentage = async (req, res)=>{
  try {
    const idPromotion = parseInt(req.params.id)
    const percentage = convertions.toPercentage(req.body.percentage)

    const updatedRecord = await promotionTypeModel.updatePromotionPercentage(idPromotion, percentage)

    if (!updatedRecord.data){
      return res.status(500).json()
    } 

    return res.status(201).json()

  } catch (error) {
    logs.writeLog('promotionType.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar logs: ${reject}`)
    })
    return res.status(500).json()
  }
}

const updatePromotionActive = async ( req, res)=>{
  try {
    const idPromotion = parseInt(req.params.id)
    const active = convertions.toBoolean(req.body.active)

    const updatedRecord = await promotionTypeModel.updatePromotionActive(idPromotion, active)

    if(!updatedRecord.data){
      return res.status(500).json()
    }

    return res.status(201).json()

  } catch (error) {
    logs.writeLog('promotionType.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar logs: ${reject}`)
    })
    return res.status(500).json()
  }
}

module.exports = {
  getPromotions
  , getPromotion
  , createPromotion
  , deletePromotion
  , updatePromotionDescription
  , updatePromotionPercentage
  , updatePromotionActive
}