const admin = require('../models/admin');
const ObjectId = require('mongodb').ObjectId;
const getAdmins = async () => await admin.find();

const getAdminById = async (id) => await admin.find(ObjectId(id));

const addCourseToAdmin = async (id, body) =>
	await admin.updateOne({ _id: ObjectId(id) }, { $push: { uploadedCourses: body } });

const deleteCourseFromAdmin = async (id, courseId) =>
	await admin.updateOne({ _id: ObjectId(id) }, { $pull: { uploadedCourses: { courseId: courseId } } });

const updateCount = async (id, courseId, value) =>
	await admin.updateOne(
		{ _id: id, 'uploadedCourses.courseId': courseId },
		{ $inc: { 'uploadedCourses.$.numberEnrolled': value } }
	);

module.exports = { getAdmins, getAdminById, addCourseToAdmin, deleteCourseFromAdmin, updateCount };
