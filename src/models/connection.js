const { Pool } = require('pg')
require('dotenv').config()

const USER = process.env.DB_USER
const PASS = process.env.DB_PASS
const HOST = process.env.DB_HOST
const PORT = process.env.DB_PORT
const DB = process.env.DB_NAME

const url = `postgres://${USER}:${PASS}@${HOST}:${PORT}/${DB}`

const pool = new Pool({
	connectionString: url
})

pool.on('connect', ()=>{
	console.log('banco conectado')
})

module.exports = {
	query: (text, params) => pool.query(text,params)
}