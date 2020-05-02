const express = require('express');
const router = express.Router;

router.post('/api/users', async (req, res) => {
	try {
		let body = req.body;
		console.log(body);
		// await client.connect();
		// let db = client.db(dbName);
		// col = db.collection('users');
		// await col.insertOne(body);
		// console.log(done);
		// await db.collection('users').find()
	} catch (err) {
		console.log(err.stack);
	}
});

module.exports = router;
