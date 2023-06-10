const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

const createUser = async (req, res)=>{
  try {
    let { email, password, name } = req.body
    
    email = String(email).trim().toLowerCase()
    password = String(password)
    name = String(name).trim().toLowerCase()

    const emailInUse = await getUserByEmail(email)
    if(emailInUse){
      return res.status(400).json({message: "This e-mail is alread in use."})
    }

    const salt = await bcrypt.genSalt(12)
    const passHash = await bcrypt.hash(password, salt)

    await userModel.createUser(email, passHash, name)

    return res.status(201).json({message: "The user was created"})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json()
  }
}

const getUserByEmail = async (email)=>{
  try {
    const userExists = await userModel.getUserByEmail(email)
    return userExists
  } catch (error) {
    console.log(error.message)
    return res.status(500).json()
  }
}

module.exports = {
  createUser
}