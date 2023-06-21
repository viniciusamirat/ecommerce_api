const db = require('./connection')

const createUser = async (email, pass, name)=>{
	const createdUser = await db.query(`
		select * from public.fc_create_user('${email}', '${pass}', '${name}')
	`)
	return createdUser
}

const getUserByEmail = async (email)=>{
	const user = await db.query(`
		select * from fc_get_user_by_email('${email}')
	`)
	
	return user.rows[0].r_exists
}

const getUserForLogin = async (email, pass)=>{
	const user = await db.query(`
		select email, password, name, type_user from public.ec_users where email = '${email}'
	`)
	return user.rows[0]
}

module.exports = {
	createUser,
	getUserByEmail,
	getUserForLogin
}