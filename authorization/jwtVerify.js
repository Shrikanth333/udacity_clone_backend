const jwt = require('jsonwebtoken');
const jwtVerify = (req, res, next) => {
	const user = JSON.parse(req.headers.authorization);
	jwt.verify(user.token, 'secret_key', (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		next();
	});
};
module.exports = { jwtVerify };
