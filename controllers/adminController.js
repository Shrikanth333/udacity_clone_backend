const admin = require('../models/admin');
const ObjectId = require('mongodb').ObjectId;
getAdmins = async () => await admin.find();

getAdminById = async (id) => await admin.find(ObjectId(id));

addCourseToAdmin = async (id, body) =>
	await admin.updateOne({ _id: ObjectId(id) }, { $push: { uploadedCourses: body } });

deleteCourseFromAdmin = async (id, courseId) =>
	await admin.updateOne({ _id: ObjectId(id) }, { $pull: { uploadedCourses: { courseId: courseId } } });

updateCount = async (id, courseId, value) =>
	await admin.updateOne(
		{ _id: id, 'uploadedCourses.courseId': courseId },
		{ $inc: { 'uploadedCourses.$.numberEnrolled': value } }
	);

module.exports = { getAdmins, getAdminById, addCourseToAdmin, deleteCourseFromAdmin, updateCount };
