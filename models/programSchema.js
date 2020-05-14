const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('../config/dbConnection.js');
const programSchema = new Schema({
	title: String,
	description: String,
	prerequesites: String,
	requirements: String,
	price: { type: Number, default: 0 },
	skillLevel: String,
	codingLanguage: String,
	enrolledCount: Number,
	instructors: [
		{
			name: String,
			bio: String,
			imageUrl: String,
		},
	],
	lessons: [
		{
			lessonId: { type: Schema.Types.ObjectId },
			title: String,
			description: String,
			timeline: String,
			concepts: [
				{
					title: String,
					url: String,
					conceptType: String,
					quizData: {
						question: String,
						options: [],
						answer: String,
					},

					content: String,
				},
			],
		},
	],
	date: { type: Date, default: Date.now },
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
