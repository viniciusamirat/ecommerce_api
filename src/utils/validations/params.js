const blockedLetters = [';', '-', '/', '*']

const validateId = (id)=>{
  if ((id === undefined) || (isNaN(Number(id))) || (id === null) || (id <= 0)){
    return false
  } else {
    return true
  }
}

const validateDescription = (desc)=>{
  if ((desc === undefined) || (String(desc).trim() === '') || (desc === null)){
    return false
  } else {
    
    for (let c = 0; c < blockedLetters.length; c++){
      if (desc.includes(blockedLetters[c])){
        return false
      }
    }

    return true
  }
}

const validatePercentage = (percentage)=>{
  if ((percentage === undefined) || (percentage === null) || (isNaN(parseFloat(percentage))) || (parseFloat(percentage) < 0)){
    return false
  } else {
    return true
  }
}

const validateBoolean = (bool)=>{
  if ((bool === true) || (bool === false)){
    return true
  } else {
    return false
  }
}

const validatePrice = (price)=>{
  if ((price === undefined) || (isNaN(parseFloat(price))) || (price === null) || (price === '') || (parseFloat(price) < 0)){
    return false
  } else {
    return true
  }
}

const validateEmail = (email)=>{
  if((email === undefined) || (email === null) || (String(email).trim() === '') || (!String(email).includes('@')) || (!String(email).includes('.com'))){
    return false
  } else{
    return true
  }
}

const validateName = (name)=>{
  if((name === undefined) || (name === null) || (String(name).trim() === '')){
    return false
  } else{
    return true
  }
}

const validatePassword = (pass)=>{
  if((pass === undefined) || (pass === null) || (String(pass).trim() === '')){
    return false
  } else{
    return true
  }
}

module.exports = {
  validateId
  , validateDescription
  , validatePercentage
  , validateBoolean
  , validatePrice
  , validateEmail
  , validateName
  , validatePassword
}