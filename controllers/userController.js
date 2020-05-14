const user = require('../models/user');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async () => await user.find();

const getUserById = async (userId) => await user.findOne(ObjectId(userId));
const getUserCurrentCourse = async (userId, courseId) => {
  const result = await user.findOne({ _id: userId });

  return result.enrolledCourses.filter((course) => {
    return course.courseId.toString() === courseId;
  });
};

const addlessonToCurrentCourse=async(userId, courseId,body)=>{
 const result= await user.updateOne(
  { _id: ObjectId(userId), 'enrolledCourses.courseId': courseId },
  { $push: { 'enrolledCourses.$.lessonsProgress': body } }
  )
  
  return result
}
const addCompletedConceptToLesson =async(userId,courseId,lessonId,conceptId)=>{
  console.log(conceptId)
  const result= await user.updateOne(
    { _id: ObjectId(userId), 
      'enrolledCourses.courseId': courseId ,
    'enrolledCourses.lessonsProgress.lessonId': lessonId
  },
    { $push: { 'enrolledCourses.$.lessonsProgress.0.completedConcepts':conceptId} }
    )
    console.log(result)
    return result
}
const addCourseToUser = async (id, body) =>
  await user.updateOne({ _id: id }, { $push: { enrolledCourses: body } });

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
  getUserCurrentCourse,
  addlessonToCurrentCourse,
  addCompletedConceptToLesson,
  deleteCourseFromUser,
  updateUser,
  deleteuser,
};
