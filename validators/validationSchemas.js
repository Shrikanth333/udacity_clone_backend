const joi = require('joi');
const schemas = {
	userSchema: joi.object({
		username: joi.string().lowercase().required(),
		password: joi.string().min(8).required(),
		details: { firstName: joi.string().required(), lastName: joi.string().required(), gender: joi.string().required() },
		contact: { email: joi.string().email().required(), phone: joi.number().required() },
		isAdminUser: joi.boolean().required(),
	}),
	adminSchema: joi.object({
		
		uploadedCourses: joi.array().items({
			courseId: joi.string().required(),
		}),
	}),
	courseSchema: joi.object({
		courseId: joi.string().required(),
		courseTitle: joi.string(),
		courseDescription: joi.string(),
		lessonsProgress: joi.array().items({
			lessonId: joi.string(),
			lessonTitle: joi.string(),
		}),
	}),
	adminCourse: joi.object({
		courseId: joi.string().required(),
	}),
};

module.exports = schemas;
