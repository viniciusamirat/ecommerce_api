const db = require('./connection')

const createUser = async (email, pass, name)=>{
	const createdUser = await db.query(`
		insert into ec_users (email, password, name) values ('${email}', '${pass}', '${name}')
	`)
	return createdUser
}

module.exports = {
	createUser
}