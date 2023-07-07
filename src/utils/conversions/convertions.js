const toDescription = (desc)=>{
  const description = String(desc).trim().toLowerCase()
  return description
}

const toPercentage = (percent)=>{
  const percentage = parseFloat(percent).toFixed(2)
  return percentage
}

const toPrice = (price)=>{
  const newPrice = parseFloat(price).toFixed(2)
  return newPrice
}

const toBoolean = (bool)=>{
  if ((bool === true) || (bool === false)){
    return bool
  } else {
    return false
  }
}

const toPath = (path)=>{
  const newPath = String(path).trim().toLowerCase()
  return newPath
}

module.exports = {
  toDescription
  , toPercentage
  , toBoolean
  , toPrice
  , toPath
}