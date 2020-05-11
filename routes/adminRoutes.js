const express = require('express');
const router = express.Router();
const schemas = require('../validators/validationSchemas');
const middleware = require('../middlewares/middleware');
const db = require('../controllers/adminController');
const getUserId=require("../authorization/jwtDecoder.js")






router.get('/', async (req, res) => {
	try {
		const user=getUserId(req) 
		let result = await db.getAdminById(user._id);
		console.log( result)
		if (result) res.status(200).send(result);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});
// middleware(schemas.adminCourse)
router.post('/',  async (req, res) => {
	try {
		const user=getUserId(req) 
		console.log(user._id, req.body)
		let result = await db.addCourseToAdmin(user._id, req.body);
		if (result) res.status(200).send(req.body);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});

router.delete('/courses/:courseId', async (req, res) => {
	try {
		console.log("hi delete")
		const user=getUserId(req) 
		let result = await db.deleteCourseFromAdmin(user._id, req.params.courseId);
		console.log(result)
		if (result) res.status(200).sendStatus(200);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});
router.put('/courses/:courseId', async (req, res) => {
	try {
		const user=getUserId(req) 
		let value = req.query.inc == 'true' ? 1 : -1;
		let result = await db.updateCount(user._id, req.params.courseId, value);
		if (result.nModified) res.status(200).send(req.body);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});

module.exports = router;
