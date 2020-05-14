const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../config/direct');

let adminSchema = new Schema({
	uploadedCourses: [
		{
			courseId: String,
		},
	],
});

let admin = mongoose.model('admin', adminSchema);

module.exports = admin;
