const express = require('express');
const router = express.Router();
const db = require('../controllers/signInController');

router.post('/', async (req, res) => {
	console.log(req.body);
	let result = await db.signIn(req.body);
	if (result.token) res.status(200).send(result);
	else if (result.token === null) res.status(406).send('Incorrect password');
	else res.status(404).send('User not found');
});

module.exports = router;
