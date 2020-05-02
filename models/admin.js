const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let adminSchema = new Schema({
	uploadedCourses: [
		{
			courseId: String,
			numberEnrolled: Number,
		},
	],
});

let admin = mongoose.model('admin', adminSchema);

module.exports = admin;
