const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');

const url = 'mongodb+srv://udacity-thor:avengers$23@udacity-thor-ltuh0.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(url, { useUnifiedTopology: true });
// const dbName = 'thor';
// const collection = 'users';
// async function run() {
// 	try {
// 		await client.connect();
// 		console.log('Connected correctly to server');
// 		const db = client.db(dbName);
// 		const col = await db.collection(collection).find().toArray();
// 		console.log(col);
// 	} catch (err) {
// 		console.log(err.stack);
// 	} finally {
// 		await client.close();
// 	}
// }

// run().catch(console.dir);
module.exports = client;
