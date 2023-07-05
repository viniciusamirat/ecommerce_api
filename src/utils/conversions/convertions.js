const toDescription = (desc)=>{
  const description = desc.trim().toLowerCase()
  return description
}

const toPercentage = (percent)=>{
  const percentage = parseFloat(percent).toFixed(2)
  return percentage
}

const toBoolean = (bool)=>{
  if ((bool === true) || (bool === false)){
    return bool
  } else {
    return false
  }
}

module.exports = {
  toDescription
  , toPercentage
  , toBoolean
}