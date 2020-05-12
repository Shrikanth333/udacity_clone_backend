const user = require('../models/user');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async () => await user.find();

const getUserById = async (id) => await user.findOne(ObjectId(id));

const addCourseToUser = async (id, body) => 
  await user.updateOne(
    { _id: id },
    { $push: { enrolledCourses: body } }
  );

const deleteCourseFromUser = async (id, courseId) =>
  await user.updateOne(
    { _id: ObjectId(id) },
    { $pull: { enrolledCourses: { courseId: courseId } } }
  );
const updateUser = async (id, body) =>
  await user.findOneAndUpdate({ _id: ObjectId(id) }, body);

const deleteuser = async (id) => await user.deleteOne({ _id: ObjectId(id) });

module.exports = {
  getAllUsers,
  addCourseToUser,
  getUserById,
  deleteCourseFromUser,
  updateUser,
  deleteuser,
};
