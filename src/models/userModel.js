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
		select * from fc_get_user_for_login('${email}')
	`)
	return user.rows[0]
}

module.exports = {
	createUser,
	getUserByEmail,
	getUserForLogin
}