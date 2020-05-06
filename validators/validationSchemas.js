const joi = require('joi');
const schemas = {
	userSchema: joi.object({
		username: joi.string().lowercase().required(),
		password: joi.required(),
		details: { firstName: joi.string().required(), lastName: joi.string().required(), gender: joi.string().required() },
		contact: { email: joi.string().email().required(), phone: joi.number().required() },
		isAdminUser: joi.boolean().required(),
	}),
	adminSchema: joi.object({
		adminId: joi.number().required(),
		uploadedCourses: joi.array().items({
			courseId: joi.string().required(),
		}),
	}),
	courseSchema: joi.object({
		courseId: joi.number().required(),
		courseTitle: joi.string().required(),
		lessonsProgress: joi.array().items({
			lessonId: joi.number().required(),
			lessonTitle: joi.string().required(),
		}),
	}),
	adminCourse: joi.object({
		courseId: joi.number().required(),
	}),
};

module.exports = schemas;
