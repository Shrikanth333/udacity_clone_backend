const express = require('express');
const router = express.Router();
const db = require('../controllers/logInController');

router.post('/', async (req, res, next) => {
	try {
		let result = await db.signIn(req.body);

		if (result.token) res.status(200).send(result);
		else if (result.token === null) res.status(406).send('Incorrect password!');
		else res.status(404).send('User not found.');
	} catch (err) {
		next(err);
	}
});

module.exports = router;
