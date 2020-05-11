const admin = require('../models/admin');
const ObjectId = require('mongodb').ObjectId;


const newAdmin=async(userId)=>{
	// console.log(""userId)
	const Admin=new admin({_id:userId})
	return await Admin.save()

}

const getAdmins = async () => await admin.find();

const getAdminById = async (id) => await admin.findOne(ObjectId(id));

const addCourseToAdmin = async (id, body) =>
{console.log(id, body)


	// body.courseId = ObjectId(body.courseId);

	const currentAdmin = await admin.findOne({ _id: id });
  
	await currentAdmin.uploadedCourses.push(body);
	return await currentAdmin.save();


	// await admin.updateOne({ _id: ObjectId(id) }, { $push: { uploadedCourses: body } });
}
const deleteCourseFromAdmin = async (id, courseId) =>{
	// console.log(id, courseId)
	return await admin.updateOne({ _id: ObjectId(id) }, { $pull: { uploadedCourses: { courseId: courseId } } });
}
const updateCount = async (id, courseId, value) =>
	await admin.updateOne(
		{ _id: id, 'uploadedCourses.courseId': courseId },
		{ $inc: { 'uploadedCourses.$.numberEnrolled': value } }
	);

module.exports = { getAdmins, getAdminById, addCourseToAdmin, deleteCourseFromAdmin, updateCount,newAdmin };
