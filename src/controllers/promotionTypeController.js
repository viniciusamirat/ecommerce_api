const promotionTypeModel = require('../models/promotionTypeModel')
const logs = require('../utils/files/logs')

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


module.exports = {
  getPromotions
  ,getPromotion
}