const express = require('express');
const router = express.Router();
const schemas = require('../validators/validationSchemas');
const middleware = require('../middlewares/middleware');
const db = require('../controllers/adminController');
const getUserId = require('../authorization/jwtDecoder.js');

router.get('/', async (req, res, next) => {
	try {
		const user = getUserId(req);
		let result = await db.getAdminById(user._id);

		if (result) res.status(200).send(result);
		else res.status(404).send({ message: 'admin not found' });
	} catch (err) {
		next(err);
	}
});

router.post('/', middleware(schemas.adminCourse), async (req, res, next) => {
	try {
		const user = getUserId(req);

		let result = await db.addCourseToAdmin(user._id, req.body);

		if (result.nModified) res.status(200).send(req.body);
		else res.status(400).send({ message: 'insert the course to admin is unsuccessfull' });
	} catch (err) {
		next(err);
	}
});

router.delete('/courses/:courseId', async (req, res, next) => {
	try {
		const user = getUserId(req);
		let result = await db.deleteCourseFromAdmin(user._id, req.params.courseId);

		if (result.nModified) res.status(200).sendStatus(200);
		else res.status(404).send({ message: 'course not found in admin' });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
