const dbClient = require('../config/connect');
const user = require('../models/user');
const dbName = 'thor';
const ObjectId = require('mongodb').ObjectId;
const jwt=require("jsonwebtoken")
const getAllUsers = async () => await user.find();

const getUserById = async (id) => await user.findOne(ObjectId(id));
const signIn=async(body)=>{
	console.log("signIn")
	const currentUser= await user.findOne({"contact.email":body.email})
	console.log(currentUser)
	if(currentUser&&currentUser.password===body.password){
		const token=jwt.sign({_id:currentUser._id},"secret_key")
		
	return {"token":token,user:{id:currentUser._id,userName:currentUser.username}}
	}
	return false
}
const addCourseToUser = async (id, body) =>
	await user.updateOne({ _id: ObjectId(id) }, { $push: { enrolledCourses: body } });

const deleteCourseFromUser = async (id, courseId) =>
	await user.updateOne({ _id: ObjectId(id) }, { $pull: { enrolledCourses: { courseId: courseId } } });

const addUser = async (body) => {
	details = new user(body);
	return await details.save();
};

const updateUser = async (id, body) => await user.findOneAndUpdate({ _id: ObjectId(id) }, body);

const deleteuser = async (id) => await user.deleteOne({ _id: ObjectId(id) });

module.exports = { getAllUsers, addCourseToUser, getUserById, deleteCourseFromUser, addUser, updateUser, deleteuser,signIn };
