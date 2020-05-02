const dbClient = require('../models/connect');
const dbName = 'thor';
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async () => {
	await dbClient.connect();
	let db = dbClient.db(dbName);
	let col = await db.collection('users').find().toArray();
	// dbClient.close();
	return col;
};
const getUserById = async (id) => {
	await dbClient.connect();
	let db = dbClient.db(dbName);
	return await db.collection('users').find(ObjectId(id)).toArray();
	// dbClient.close();
};

const addUser = async (body) => {
	await dbClient.connect();
	let db = dbClient.db(dbName);
	col = db.collection('users');
	return await col.insertOne(body);
	// dbClient.close();
};

const updateUser = async (id, body) => {
	await dbClient.connect();
	let db = dbClient.db(dbName);
	col = db.collection('users');
	return await col.replaceOne({ _id: ObjectId(id) }, { body });
};

const deleteuser = async (id) => {
	await dbClient.connect();
	let db = dbClient.db(dbName);
	col = db.collection('users');
	console.log(12345);
	return await col.deleteOne({ _id: ObjectId(id) });
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteuser };
