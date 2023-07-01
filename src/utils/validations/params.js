const validateId = (id)=>{
  if ((id === undefined) || (isNaN(Number(id))) || (id === null) || (id <= 0)){
    return false
  } else {
    return true
  }
}

module.exports = {
  validateId
}