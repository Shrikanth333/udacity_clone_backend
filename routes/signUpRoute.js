const express = require('express');
const router = express.Router();
const db = require('../controllers/signUpController');
const schemas = require('../validators/validationSchemas');
const middleware = require('../middlewares/middleware');
const bcrypt = require('bcrypt');

router.post('/', middleware(schemas.userSchema), async (req, res) => {
	try {
		let body = req.body;
		body.password = await bcrypt.hash(body.password, 10);
		let result = await db.newUser(body);
		if (result) res.status(201).send(result);
		else res.status(400).send('User already exists!');
	} catch (err) {
		console.log(err.stack);
	}
});

module.exports = router;
