const express = require('express')
const app = express()
const userRouter = require('./src/routes/userRouter')
const productcategoryRouter = require('./src/routes/productCategoryRouter')
const promotionTypeRouter = require('./src/routes/promotionTypeRouter')
const productRouter = require('./src/routes/productRouter')

app.use(express.json())

app.use('/users', userRouter)

app.use('/category', productcategoryRouter)

app.use('/promotion', promotionTypeRouter)

app.use('/product', productRouter)

app.use(express.static('./public'))

module.exports = app