const user = require('../models/user');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async () => await user.find();

const getUserById = async (userId) => await user.findById(ObjectId(userId));

const getUserCurrentCourse = async (userId, courseId) => {
	const result = await user.findOne({ _id: userId });

	return result.enrolledCourses.filter((course) => {
		return course.courseId.toString() === courseId;
	});
};

const addlessonToCurrentCourse = async (userId, courseId, body) => {
	const result = await user.updateOne(
		{ _id: ObjectId(userId), 'enrolledCourses.courseId': courseId },
		{ $push: { 'enrolledCourses.$.lessonsProgress': body } }
	);

	return result;
};
const addCompletedConceptToLesson = async (userId, courseId, lessonId, conceptId) => {
	const result = await user.updateOne(
		{
			_id: ObjectId(userId),
			'enrolledCourses.courseId': courseId,
			'enrolledCourses.lessonsProgress.lessonId': lessonId,
		},
		{ $push: { 'enrolledCourses.$.lessonsProgress.0.completedConcepts': conceptId } }
	);

	return result;
};
const addCourseToUser = async (id, body) => await user.updateOne({ _id: id }, { $push: { enrolledCourses: body } });

const deleteCourseFromUser = async (id, courseId) =>
	await user.updateOne({ _id: ObjectId(id) }, { $pull: { enrolledCourses: { courseId: courseId } } });

const updateUser = async (id, body) => {
	const result = await user.find({ 'contact.email': body });
	if (!result.length) return await user.findByIdAndUpdate(ObjectId(id), { $set: { 'contact.email': body } });
	else return null;
};

const deleteuser = async (id) => await user.deleteOne({ _id: ObjectId(id) });

module.exports = {
	getAllUsers,
	addCourseToUser,
	getUserById,
	getUserCurrentCourse,
	addlessonToCurrentCourse,
	addCompletedConceptToLesson,
	deleteCourseFromUser,
	updateUser,
	deleteuser,
};
