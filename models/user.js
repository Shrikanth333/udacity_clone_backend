let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let userSchema = new Schema({
	username: String,
	password: String,
	details: { firstName: String, lastName: String, gender: String },
	contact: { email: String, phone: Number },
	enrolledCourses: [
		{
			courseId: Number,
			courseTitle: String,
			overallProgress: Number,
			lessonsProgress: [
				{
					lessonId: Number,
					lessonTitle: String,
					progress: Number,
				},
			],
		},
	],
	isAdminUser: Boolean,
});

let user = mongoose.model('user', userSchema);

module.exports = user;
