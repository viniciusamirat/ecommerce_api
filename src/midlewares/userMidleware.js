const jwt = require('jsonwebtoken')
require('dotenv').config()

const params = require('../utils/validations/params')

const SECRET = process.env.SECRET

const validateCreateUser = (req, res, next)=>{
  const isValidEmail = params.validateEmail(req.body.email)
  const isValidPass = params.validatePassword(req.body.password)
  const isValidName = params.validateName(req.body.name)

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

const validateLogin = (req, res, next)=>{
  const isValidEmail = params.validateEmail(req.body.email)
  const isValidPass = params.validatePassword(req.body.password)

  if(!isValidEmail){
    return res.status(400).json({message: "This e-mail is not valid."})
  } else if (!isValidPass){
    return res.status(400).json({message: "This password is not valid."})
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
    return res.status(400).json({message: "Token invalid"})
  }
}

const validateTokenAdmin = (req, res, next)=>{
  try {
    const [, token] = req.headers.authorization.split(' ')

    const user = jwt.verify(token, SECRET)

    const { email, name, type_user } = JSON.parse(user.user)

    if (type_user === 'admin'){
      return next()
    } else {
      return res.status(401).json({message: "You don't have permission."})
    }

  } catch (error) {
    return res.status(400).json({message: "Token invalid"})
  }
}

module.exports = {
  validateCreateUser,
  validateTokenCustomer,
  validateTokenAdmin,
  validateLogin
}