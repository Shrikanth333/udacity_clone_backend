const Joi = require('@hapi/joi');

const programValidator = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  prerequsites: Joi.string(),
  requirements: Joi.string(),

  
});
const lessonValidator = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  timeline: Joi.string(),
});
const instructorValidator = Joi.object({
  name: Joi.string(),
  bio: Joi.string(),
  imageUrl: Joi.string(),
});
const conceptValidator = Joi.object({
  title: Joi.string(),
  url: Joi.string(),
  conceptType: Joi.string(),
  content: Joi.string(),
});
const quizDataValidator = Joi.object({
  question: Joi.string(),
  options: Joi.array().items(Joi.string()),
  answer: Joi.string(),
});

const paramsValidator = Joi.object({
  programId: Joi.string(),
  lessonId: Joi.string(),
  conceptId: Joi.string(),
  instructorId: Joi.string(),
});

module.exports = {
  programValidator,
  paramsValidator,
  lessonValidator,
  conceptValidator,
  instructorValidator,
  quizDataValidator
};
