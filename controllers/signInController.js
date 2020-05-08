const user = require('../models/user');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');

const signIn = async (body) => {
	console.log('signIn');
	const currentUser = await user.findOne({ 'contact.email': body.email });
	console.log(currentUser);
	if (currentUser && currentUser.password === body.password) {
		const token = jwt.sign({ _id: currentUser._id }, 'secret_key');

		return { token: token, user: { id: currentUser._id, userName: currentUser.username } };
	}
	return false;
};

module.exports = { signIn };
