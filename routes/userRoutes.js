const express = require('express');
const router = express.Router();
const db = require('../controllers/userController');
router.get('/', async (req, res) => {
	try {
		let col = await db.getAllUsers();
		if (col) res.status(200).send(col);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});
router.get('/:id', async (req, res) => {
	try {
		id = req.params.id;
		let col = await db.getUserById(id);
		if (col) res.status(200).send(col);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});
router.post('/', async (req, res) => {
	try {
		let body = req.body;
		let result = await db.addUser(body);
		if (result.insertedCount) res.status(200).send(body);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});
router.put('/:id', async (req, res) => {
	try {
		let id = req.params.id;
		let body = req.body;
		let result = await db.updateUser(id, body);
		if (result.modifiedCount) res.status(200).send(body);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});
router.delete('/:id', async (req, res) => {
	try {
		let id = req.params.id;
		let result = await db.deleteuser(id);
		if (result.deletedCount) res.status(200).sendStatus(200);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});
module.exports = router;
