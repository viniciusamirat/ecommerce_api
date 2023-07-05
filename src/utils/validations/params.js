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

module.exports = {
  validateId
  ,validateDescription
}