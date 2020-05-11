const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signIn = async (body) => {
	const result = await user.find({ $or: [{ 'contact.email': body.email }, { username: body.email }] });
	let currentUser = result[0];
	if (currentUser) {
		let pass = await bcrypt.compare(body.password.toString(), currentUser.password);
		if (pass) {
			const token = jwt.sign({ _id: currentUser._id }, 'secret_key');
			return { token: token,  isAdmin:currentUser.isAdminUser, userName: currentUser.username };
		} else return { token: null };
	}
	return { token: undefined };
};

module.exports = { signIn };
