const express = require('express');
const router = express.Router();
const schemas = require('../validators/validationSchemas');
const middleware = require('../middlewares/middleware');
const db = require('../controllers/adminController');
router.get('/', async (req, res) => {
	try {
		let result = await db.getAdmins();
		if (result) res.status(200).send(result);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});

router.get('/:id', async (req, res) => {
	try {
		let result = await db.getAdminById(req.params.id);
		if (result) res.status(200).send(result);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});

router.post('/:id', middleware(schemas.adminCourse), async (req, res) => {
	try {
		let result = await db.addCourseToAdmin(req.params.id, req.body);
		if (result.nModified) res.status(200).send(req.body);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});

router.delete('/:id/courses/:courseId', async (req, res) => {
	try {
		let result = await db.deleteCourseFromAdmin(req.params.id, req.params.courseId);
		if (result.nModified) res.status(200).sendStatus(200);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});
router.put('/:id/courses/:courseId', async (req, res) => {
	try {
		let value = req.query.inc == 'true' ? 1 : -1;
		let result = await db.updateCount(req.params.id, req.params.courseId, value);
		if (result.nModified) res.status(200).send(req.body);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});

module.exports = router;
