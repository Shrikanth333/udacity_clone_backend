const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../controllers/userController');
const schemas = require('../validators/validationSchemas');
const middleware = require('../middlewares/middleware');

router.post("/login", async(req,res)=>{
	console.log(req.body)
	let result=await db.signIn(req.body)

	console.log("30",result)
	
	if(result.token){
	res.status(200).send( result)
	}
	else{
		res.status(404).send("invalid user")
	}
})


router.get('/', async (req, res) => {
	try {
		let result = await db.getAllUsers();
		if (result) res.status(200).send(result);
		else res.status(500).sendStatus(500);
	} catch (err) {
		console.log(err.stack);
	}
});
router.get('/:id', async (req, res) => {
	try {
		id = req.params.id;
		let result = await db.getUserById(id);
		if (result) res.status(200).send(result);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});

router.post('/', middleware(schemas.userSchema), async (req, res) => {
	try {
		let body = req.body;
		body.password = await bcrypt.hash(body.password, 10);
		let result = await db.addUser(body);
		console.log(result);
		if (result) res.status(200).send(result);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});

router.post('/:id', middleware(schemas.courseSchema), async (req, res) => {
	try {
		let body = req.body;
		let result = await db.addCourseToUser(req.params.id, body);
		console.log(result);
		if (result.nModified) res.status(200).send(body);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});

router.delete('/:id/courses/:courseId', async (req, res) => {
	try {
		let body = req.body;
		let result = await db.deleteCourseFromUser(req.params.id, req.params.courseId);
		console.log(result);
		if (result.nModified) res.status(200).send(body);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});

router.put('/:id', middleware(schemas.userSchema), async (req, res) => {
	try {
		let id = req.params.id;
		let body = req.body;
		let result = await db.updateUser(id, body);
		if (result.nModified) res.status(200).send(body);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});
router.delete('/:id', async (req, res) => {
	try {
		let id = req.params.id;
		let result = await db.deleteuser(id);
		if (result.deletedCount) res.status(200).sendStatus(200);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});
module.exports = router;
