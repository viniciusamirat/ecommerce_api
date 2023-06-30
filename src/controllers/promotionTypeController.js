const promotionTypeModel = require('../models/promotionTypeModel')
const logs = require('../utils/files/logs')

const getPromotions = async (req, res)=>{
  try {
    const result = await promotionTypeModel.getPromotions()

    return res.status(200).json(result)
  } catch (error) {
    logs.writeLog('promotionType.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}


module.exports = {
  getPromotions
}