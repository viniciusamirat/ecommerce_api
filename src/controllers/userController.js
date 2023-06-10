const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

const createUser = async (req, res)=>{
  try {
    let { email, password, name } = req.body
    
    email = String(email).trim().toLowerCase()
    password = String(password)
    name = String(name).trim().toLowerCase()

    const salt = await bcrypt.genSalt(12)
    const passHash = await bcrypt.hash(password, salt)

    await userModel.createUser(email, passHash, name)

    return res.status(201).json({message: "The user was created"})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json()
  }
}

module.exports = {
  createUser
}