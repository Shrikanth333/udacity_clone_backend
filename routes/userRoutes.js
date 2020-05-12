const express = require('express');
const router = express.Router();
const db = require('../controllers/userController');
const schemas = require('../validators/validationSchemas');
const middleware = require('../middlewares/middleware');
const getUserId=require("../authorization/jwtDecoder.js")
// router.post("/login", async(req,res)=>{
// 	console.log(req.body)
// 	let result=await db.signIn(req.body)

// 	console.log("30",result)
	
// 	if(result){
// 	res.status(200).send( result)
// 	}
// 	else{
// 		res.status(400).send(false)
// 	}
// })


// router.get('/', async (req, res) => {
// 	try {
// 		let result = await db.getAllUsers();
// 		if (result) res.status(200).send(result);
// 		else res.status(500).sendStatus(500);
// 	} catch (err) {
// 		console.log(err.stack);
// 	}
// });
router.get('/', async (req, res) => {

	try {
	const user=getUserId(req) 
	// console.log(userId)
		let result = await db.getUserById(user._id);
		console.log(result)
		if (result) res.status(200).send(result);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});

// middleware(schemas.courseSchema)
router.post('/', async (req, res) => {
	try {
		console.log("hi")
		const user=getUserId(req) 
		let body = req.body;
		let result = await db.addCourseToUser(user._id,body);
		console.log(result);
		if (result) res.status(200).send(body);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});

router.delete('/courses/:courseId', async (req, res) => {
	try {
		
		const user=getUserId(req) 
		// let body = req.body;
		let result = await db.deleteCourseFromUser(user._id, req.params.courseId);
	
		// if (result)
		 res.status(200).send({message:"deleted successfully"});
		// else res.status(404).sendStatus(404);
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
		console.log("hi delete")
		let id = req.params.id;
		let result = await db.deleteuser(id);
		if (result.deletedCount) res.status(200).sendStatus(200);
		else res.status(404).sendStatus(404);
	} catch (err) {
		console.log(err.stack);
	}
});
module.exports = router;
