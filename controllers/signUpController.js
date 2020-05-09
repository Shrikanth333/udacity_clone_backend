const user = require('../models/user');

const newUser = async (body) => {
	const result = await user.find({ $or: [{ 'contact.email': body.contact.email }, { username: body.username }] });
	if (result.length === 0) {
		details = new user(body);
		return await details.save();
	}
	return false;
};

module.exports = { newUser };
