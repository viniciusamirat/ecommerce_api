const express = require('express')
const app = express()
const userRouter = require('./src/routes/userRouter')

app.use(express.json())

app.use('/users', userRouter)




app.use(express.static('./public'))

module.exports = app