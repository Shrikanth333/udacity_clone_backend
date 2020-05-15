const express = require('express');
const router = express.Router();
const db = require('../controllers/signUpController');
const schemas = require('../validators/validationSchemas');
const middleware = require('../middlewares/middleware');
const bcrypt = require('bcrypt');
const dbAdmin = require('../controllers/adminController');

router.post('/', middleware(schemas.userSchema), async (req, res, next) => {
  try {
    let body = req.body;
    body.password = await bcrypt.hash(body.password, 10);
    let result = await db.newUser(body);
    if (result) res.status(201).send(result);
    else res.status(400).send({ message: 'User already exists!' });
  } catch (err) {
    next(err);
  }
});

router.post('/admin/:userId', async (req, res) => {
  try {
    let result = await dbAdmin.newAdmin(req.params.userId);

    if (result) res.status(200).send(result);
    else res.status(404).sendStatus(404);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
