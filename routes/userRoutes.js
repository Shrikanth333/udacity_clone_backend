const express = require('express');
const router = express.Router();
const db = require('../controllers/userController');
const schemas = require('../validators/validationSchemas');
const middleware = require('../middlewares/middleware');
const mailer = require('./mailer');
const getUserId = require('../authorization/jwtDecoder.js');

router.get('/', async (req, res, next) => {
	try {
		const user = getUserId(req);
		let result = await db.getUserById(user._id);
		if (result) res.status(200).send(result);
		else res.status(404).send({ message: 'User not found' });
	} catch (err) {
		next(err);
	}
});

router.post('/deleteaccount', async (req, res, next) => {
	try {
		const user = getUserId(req);
		let result = await db.getUserById(user._id);
		mailer.mailUser(
			result.details.firstName.charAt(0).toUpperCase() + result.details.firstName.slice(1),
			result.contact.email,
			result.password
		);
		if (result) res.status(200).sendStatus(200);
		else res.status(404).send({ message: 'User not found' });
	} catch (err) {
		next(err);
	}
});

router.get('/course/:courseId', async (req, res, next) => {
	try {
		const user = getUserId(req);

		let result = await db.getUserCurrentCourse(user._id, req.params.courseId);

		if (result) res.status(200).send(result[0]);
		else res.status(404).send({ message: 'Course not found' });
	} catch (err) {
		next(err);
	}
});

router.post('/', middleware(schemas.courseSchema), async (req, res, next) => {
	try {
		const user = getUserId(req);
		let body = req.body;
		let result = await db.addCourseToUser(user._id, body);

		if (result.nModified) res.status(200).send(body);
		else res.status(400).send({ message: 'Insert the course to user is unsuccessfull' });
	} catch (err) {
		next(err);
	}
});

router.post('/course/:courseId', async (req, res, next) => {
	try {
		const user = getUserId(req);

		let result = await db.addlessonToCurrentCourse(user._id, req.params.courseId, req.body);

		if (result.nModified) res.status(200).send(result);
		else res.status(400).send({ message: 'Course not inserted successfully' });
	} catch (err) {
		next(err);
	}
});
router.post('/course/:courseId/lesson/:lessonId', async (req, res, next) => {
	try {
		const user = getUserId(req);

		let result = await db.addCompletedConceptToLesson(
			user._id,
			req.params.courseId,
			req.params.lessonId,
			req.body.conceptId
		);

		if (result.nModified) res.status(200).send(result);
		else res.status(400).send({ message: 'Course not  inserted successfully' });
	} catch (err) {
		next(err);
	}
});

router.delete('/courses/:courseId', async (req, res, next) => {
	try {
		const user = getUserId(req);
		let result = await db.deleteCourseFromUser(user._id, req.params.courseId);
		if (result.nModified) res.status(200).send({ message: 'deleted successfully' });
		else
			res.status(404).sendStatus({
				message: 'course is not found in the user subscription',
			});
	} catch (err) {
		next(err);
	}
});

router.put('/updatedetails/:address', async (req, res, next) => {
	try {
		const user = getUserId(req);
		let result = await db.updateUser(user._id, req.params.address);
		if (result) res.status(200).sendStatus(200);
		else res.status(400).sendStatus(400);
	} catch (err) {
		next(err);
	}
});
router.delete('/', async (req, res, next) => {
	try {
		const user = getUserId(req);
		let result = await db.getUserById(user._id);
		if (req.body.code === result.password.slice(7, 26)) {
			res.status(200).sendStatus(200);
			let result = await db.deleteuser(user._id);
			if (result.deletedCount) res.status(200).sendStatus(200);
			else res.status(404).send('User not found');
		} else res.status(401).sendStatus(401);
	} catch (err) {
		next(err);
	}
});
module.exports = router;
