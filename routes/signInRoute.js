const express = require('express');
const router = express.Router();
const db = require('../controllers/signInController');

router.get('/login', async (req, res) => {
	console.log(1);
	console.log(req.body);
	let result = await db.signIn(req.body);
	console.log('30', result);
	if (result.token) {
		res.status(200).send(result);
	} else {
		res.status(404).send('invalid user');
	}
});

module.exports = router;
