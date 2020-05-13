const express = require('express');
const router = express.Router();
const db = require('../controllers/userController');
const schemas = require('../validators/validationSchemas');
const middleware = require('../middlewares/middleware');
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

router.post('/', middleware(schemas.courseSchema), async (req, res, next) => {
  try {
    const user = getUserId(req);
    let body = req.body;
    let result = await db.addCourseToUser(user._id, body);




    if (result.nModified) res.status(200).send(body);
    else
      res
        .status(400)
        .send({ message: 'Insert the course to user is unsuccessfull' });
  } catch (err) {
    next(err);
  }

});

router.delete(
  '/courses/:courseId',
  middleware(schemas.courseSchema),
  async (req, res, next) => {
    try {
      const user = getUserId(req);

      let result = await db.deleteCourseFromUser(user._id, req.params.courseId);

      if (result.nModified)
        res.status(200).send({ message: 'deleted successfully' });
      else
        res
          .status(404)
          .sendStatus({
            message: 'course is not found in the user subscription',
          });
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id', middleware(schemas.userSchema), async (req, res, next) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let result = await db.updateUser(id, body);
    if (result.nModified) res.status(200).send(body);
    else res.status(404).send({ message: 'user not found' });
  } catch (err) {
    next(err);
  }
});
router.delete('/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await db.deleteuser(id);
    if (result.deletedCount) res.status(200).sendStatus(200);
    else res.status(404).send({ message: 'user not found' });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
