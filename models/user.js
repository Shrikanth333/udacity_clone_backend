let mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('../config/direct');
const ObjectId = require('mongodb').ObjectId;

let userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  details: { firstName: String, lastName: String, gender: String },
  contact: { email: String, phone: Number },
  enrolledCourses: [
    {
      courseId: ObjectId,
      courseTitle: String,
      courseDescription: String,
      overallProgress: { type: Number, default: 0 },
      lessonsProgress: [
        {
          lessonId: Number,
          lessonTitle: String,
          progress: { type: Number, default: 0 },
        },
      ],
    },
  ],
  isAdminUser: Boolean,
});

let user = mongoose.model('user', userSchema);

module.exports = user;
