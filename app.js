const express = require('express');
const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/admin', require('./routes/adminRoutes'));

// app.post('/api/users', async (req, res) => {
// 	try {
// 		let body = req.body;
// 		console.log(body);
// 		// await client.connect();
// 		// let db = client.db(dbName);
// 		// col = db.collection('users');
// 		// await col.insertOne(body);
// 		// console.log(done);
// 		// await db.collection('users').find()
// 	} catch (err) {
// 		console.log(err.stack);
// 	}
// });

app.listen(port, () => console.log(`Listening on port ${port}...`));
