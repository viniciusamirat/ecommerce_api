const db = require('./connection')

const createUser = async (email, pass, name)=>{
	const createdUser = await db.query(`
		insert into public.ec_users (email, password, name) values ('${email}', '${pass}', '${name}')
	`)
	return createdUser
}

const getUserByEmail = async (email)=>{
	const user = await db.query(`
		select exists(select true from public.ec_users where email = '${email}')
	`)
	return user.rows[0].exists
}

module.exports = {
	createUser,
	getUserByEmail
}