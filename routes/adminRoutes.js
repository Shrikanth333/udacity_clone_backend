const express = require('express');
const router = express.Router();
// const db = require('../controllers/userController');
const ObjectId = require('mongodb').ObjectId;
// const schemas = require('./validationSchemas');
// const middleware = require('./middleware');
const admin = require('../models/admin');
const db = require('../controllers/adminController');
router.get('/', async (req, res) => {
	try {
		// let result = await admin.find();
		let result = await db.getAdmins();
		if (result) res.status(200).send(result);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});

router.get('/:id', async (req, res) => {
	try {
		// let result = await admin.find(ObjectId(req.params.id));
		let result = await db.getAdminById(req.params.id);
		if (result) res.status(200).send(result);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});

router.post('/:id', async (req, res) => {
	try {
		// let result = await admin.updateOne({ _id: ObjectId(req.params.id) }, { $push: { uploadedCourses: req.body } });
		let result = await db.addCourseToAdmin(req.params.id, req.body);
		if (result) res.status(200).send(result);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});

router.delete('/:id/courses/:courseId', async (req, res) => {
	try {
		// let result = await admin.updateOne(
		// 	{ _id: ObjectId(req.params.id) },
		// 	{ $pull: { uploadedCourses: { courseId: req.params.courseId } } }
		// );
		let result = await db.deleteCourseFromAdmin(req.params.id, req.params.courseId);
		if (result) res.status(200).send(result);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});
router.put('/:id/courses/:courseId', async (req, res) => {
	try {
		let value = req.query.inc == 'true' ? 1 : -1;
		let result = await db.updateCount(req.params.id, req.params.courseId, value);
		// let result = await admin.updateOne(
		// 	{ _id: req.params.id, 'uploadedCourses.courseId': req.params.courseId },
		// 	{ $inc: { 'uploadedCourses.$.numberEnrolled': value } }
		// );
		// console.log(result);
		if (result) res.status(200).send(result);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});

module.exports = router;
