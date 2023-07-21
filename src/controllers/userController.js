const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logs = require('../utils/files/logs')
const convertions = require('../utils/conversions/convertions')

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
    logs.writeLog('user.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const getUserForLogin = async (req, res)=>{
  try{
    const email = String(req.body.email).trim().toLowerCase()
    const pass = String(req.body.password)

    const userString = await userModel.getUserForLogin(email)

    if (userString.data === '[]') {
      return res.status(400).json({message: "Invalid e-mail."})
    }

    const user = JSON.parse(userString.data)
    
    const checkUser = await bcrypt.compare(pass, user[0].password)
    
    if(!checkUser){
      return res.status(404).json({message: "E-mail or password incorrect."})
    }

    const userNoPass = {
      email: user[0].email,
      name: user[0].name,
      type_user: user[0].type_user
    }

    const SECRET = process.env.SECRET

    const token = jwt.sign(
      {
        user: JSON.stringify(userNoPass)
      },
      SECRET
    )

    res.status(200).json({token: token})
  } catch (error){
    logs.writeLog('user.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

const getUserByEmail = async (email)=>{
  try {
    const userExists = await userModel.getUserByEmail(email)
    return userExists
  } catch (error) {
    logs.writeLog('user.txt', error.message)
    .catch((reject)=>{
      console.log(`Erro ao gravar log: ${reject}`)
    })
    return res.status(500).json()
  }
}

module.exports = {
  createUser,
  getUserForLogin
}