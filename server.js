const app = require('./app')
require('dotenv').config()

const host = process.env.URL_API
const port = process.env.PORT || 3000


app.listen(port, ()=>{
  console.log(`Servidor rodando em ${host}`)
})