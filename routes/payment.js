const razorpay = require('razorpay');
const shortid = require('shortid');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Program = require('../models/programSchema');
const User = require('../models/user');
const getUserId = require('../authorization/jwtDecoder.js');

let razor = new razorpay({
	key_id: 'rzp_test_yaDKxB70sTVt17',
	key_secret: 'sZzWQyAwghlpcAJWsHDPU0ME',
});

router.post('/verification', async (req, res) => {
	const secret = '12345678';
	const hash = crypto.createHmac('sha256', secret);
	hash.update(JSON.stringify(req.body));
	const digest = hash.digest('hex');
	if (digest === req.headers['x-razorpay-signature']) console.log('Okay!');
	res.status(200).sendStatus(200);
});

router.post('/signature/:courseId', async (req, res) => {
	const user = getUserId(req);
	let obj = { courseId: ObjectId(req.params.courseId) };
	let result = await User.updateOne({ _id: ObjectId(user._id) }, { $push: { enrolledCourses: obj } });
	let result_update = await Program.updateOne({ _id: req.params.courseId }, { $inc: { enrolledCount: 1 } });
	if (result.nModified && result_update.nModified) res.status(200).sendStatus(200);
});

router.get('/:id', async (req, res) => {
	try {
		let result = await Program.findOne({ _id: req.params.id });
		const payment_capture = 1,
			amount = (result.price * 100).toString(),
			receipt = shortid.generate(),
			notes = { purpose: 'course enrollment' };

		const options = { amount, currency: 'INR', receipt, payment_capture, notes };

		const pay = await razor.orders.create(options);
		if (pay.status === 'created') {
			res.status(200).send(pay);
		} else {
			res.status(404).sendStatus(404);
		}
	} catch (err) {
		console.log(err.stack);
	}
});

module.exports = router;
