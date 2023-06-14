const express = require('express')
const app = express()
const userRouter = require('./src/routes/userRouter')
const productcategoryRouter = require('./src/routes/productCategoryRouter')

app.use(express.json())

app.use('/users', userRouter)

app.use('/category', productcategoryRouter)


app.use(express.static('./public'))

module.exports = app