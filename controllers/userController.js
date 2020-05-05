const dbClient = require('../config/connect');
const user = require('../models/user');
const dbName = 'thor';
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async () => {
	// await dbClient.connect();
	// let db = dbClient.db(dbName);
	// let col = await db.collection('users').find().toArray();
	// dbClient.close();
	return await user.find();
};
const getUserById = async (id) => {
	// await dbClient.connect();
	// let db = dbClient.db(dbName);
	// return await db.collection('users').find(ObjectId(id)).toArray();
	// dbClient.close();
	return await user.findOne(ObjectId(id));
};

const addCourseToUser = async (id, body) =>
	await user.updateOne({ _id: ObjectId(id) }, { $push: { enrolledCourses: body } });
const deleteCourseFromUser = async (id, courseId) =>
	await user.updateOne({ _id: ObjectId(id) }, { $pull: { enrolledCourses: { courseId: courseId } } });

const addUser = async (body) => {
	// await dbClient.connect();
	// let db = dbClient.db(dbName);
	// col = db.collection('users');
	details = new user(body);
	return await details.save();
	// return await col.insertOne(body);

	// dbClient.close();
};

const updateUser = async (id, body) => {
	// await dbClient.connect();
	// let db = dbClient.db(dbName);
	// col = db.collection('users');
	// return await user.replaceOne({ _id: ObjectId(id) }, { body })
	return await user.findOneAndUpdate({ _id: ObjectId(id) }, body);
};

const deleteuser = async (id) => {
	// await dbClient.connect();
	// let db = dbClient.db(dbName);
	// col = db.collection('users');
	// console.log(12345);
	return await user.deleteOne({ _id: ObjectId(id) });
};

module.exports = { getAllUsers, addCourseToUser, getUserById, deleteCourseFromUser, addUser, updateUser, deleteuser };
