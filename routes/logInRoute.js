const express = require('express');
const router = express.Router();
const db = require('../controllers/logInController');

router.post('/', async (req, res) => {
	try {
		console.log("in login")
		let result = await db.signIn(req.body);
		console.log("in login",result)
		if (result.token) res.status(200).send(result);
		else if (result.token === null) res.status(406).send('Incorrect password');
		else res.status(404).send('User not found');
	} catch (err) {
		console.log(err.stack);
	}
});

module.exports = router;
