const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET

const validateCreateUser = (req, res, next)=>{
  const { email, password, name } = req.body
  
  const isValidEmail = validateEmail(email)
  const isValidPass = validatePass(password)
  const isValidName = validateName(name)

  if(!isValidEmail){
    return res.status(400).json({message: "This e-mail is not valid."})
  } else if (!isValidPass){
    return res.status(400).json({message: "This password is not valid."})
  } else if (!isValidName){
    return res.status(400).json({message: "This name is not valid."})
  } else {
    return next()
  }
}

const validateTokenCustomer = (req, res, next)=>{
  try {
    const [, token] = req.headers.authorization.split(' ')
    
    if (!token){
      return res.status(401).json({message: "Token invalid"})
    }

    jwt.verify(token, SECRET)

    return next()
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({message: "Token invalid"})
  }
}

const validateName = (name)=>{
  if((name === undefined) || (name === null) || (String(name).trim() === '')){
    return false
  } else{
    return true
  }
}

const validateEmail = (email) =>{
  if((email === undefined) || (email === null) || (String(email).trim() === '')){
    return false
  } else{
    return true
  }
}

const validatePass = (pass)=>{
  if((pass === undefined) || (pass === null) || (String(pass).trim() === '')){
    return false
  } else{
    return true
  }
}

module.exports = {
  validateCreateUser,
  validateTokenCustomer
}