const razorpay = require('razorpay');
const shortid = require('shortid');
const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Program = require('../models/programSchema');
const User = require('../models/user');

let razor = new razorpay({
	key_id: 'rzp_test_yaDKxB70sTVt17',
	key_secret: 'sZzWQyAwghlpcAJWsHDPU0ME',
});

router.post('/verification', async (req, res) => {
	const secret = '12345678';
	console.log(req.body.payload.payment.entity);
	const hash = crypto.createHmac('sha256', secret);
	hash.update(JSON.stringify(req.body));
	const digest = hash.digest('hex');
	if (digest === req.headers['x-razorpay-signature']) console.log('Okay!');
	res.status(200).sendStatus(200);
});

router.post('/signature/:id/:courseId', async (req, res) => {
	let obj = { courseId: ObjectId(req.params.courseId) };
	console.log(req.params.id, req.params.courseId);
	let result = await User.updateOne({ _id: ObjectId(req.params.id) }, { $push: { enrolledCourses: obj } });
	console.log(result);
	if (result.nModified) res.status(200).sendStatus(200);
});

router.get('/:id', async (req, res) => {
	try {
		let result = await Program.findOne({ _id: req.params.id });
		console.log(result);
		const payment_capture = 1,
			amount = (result.price * 100).toString(),
			receipt = shortid.generate(),
			notes = { purpose: 'course enrollment' };

		const options = { amount, currency: 'INR', receipt, payment_capture, notes };

		const pay = await razor.orders.create(options);
		console.log(pay);
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
