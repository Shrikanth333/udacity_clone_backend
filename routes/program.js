const express = require('express');
const router = express.Router();
const {
  postProgram,
  getProgram,
  updateProgram,
  deleteProgram
} = require('../controllers/program.js');
const {
  postProgramInstructor,
  getProgramInstructor,
  updateProgramInstructor,
  deleteProgramInstructor,
} = require('../controllers/programInstructor.js');
const {
  postProgramLesson,
  getProgramLesson,
  updateProgramLesson,
  deleteProgramLesson,
  postLessonConcept,
  updateLessonConcept,
  deleteLessonConcept,
} = require('../controllers/programLessons.js');

const {
  programValidator,
  instructorValidator,
  lessonValidator,
  conceptValidator,
  quizDataValidator,
  paramsValidator,
} = require('../validators/program.js');
router.post('/', async (req, res, next) => {
  try {
    await programValidator.validateAsync({
      title: req.body.title,
      description: req.body.description,
      prerequsites: req.body.prerequsites,
      requirements: req.body.requirements,
    });

    const result = await postProgram(req);
    res.send('success');
  } catch (e) {
    next(e);
  }
});
router.get('/', async (req, res) => {
  const result = await getProgram();
  res.send(result);
});

router.put('/:programId', async (req, res, next) => {
  try {
    await programValidator.validateAsync({
      title: req.body.title,
      description: req.body.description,
      prerequsites: req.body.prerequsites,
      requirements: req.body.requirements,
    });
    await paramsValidator.validateAsync({
      programId: req.params.programId,
    });
    const result = await updateProgram(req.params, req);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.delete('/:programId', async (req, res, next) => {
  try {
    await paramsValidator.validateAsync({
      programId: req.params.programId,
    });
    const result = await deleteProgram(req.params, req);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.post('/:programId/instructor', async (req, res, next) => {
  try {
    await instructorValidator.validateAsync({
      name: req.body.instructor.name,
      bio: req.body.instructor.bio,
      imageUrl: req.body.instructor.imageUrl,
    });

    await paramsValidator.validateAsync({
      programId: req.params.programId,
    });
    const result = await postProgramInstructor(req.params, req);
    res.send('success');
  } catch (e) {
    next(e);
  }
});

router.get('/:programId/instructor', async (req, res, next) => {
  try {
    await paramsValidator.validateAsync({
      programId: req.params.programId,
    });
    const result = await getProgramInstructor(req.params.programId);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.put('/:programId/instructor/:instructorId', async (req, res, next) => {
  try {
    await instructorValidator.validateAsync({
      name: req.body.instructor.name,
      bio: req.body.instructor.bio,
      imageUrl: req.body.instructor.imageUrl,
    });
    await paramsValidator.validateAsync({
      programId: req.params.programId,
      instructorId: req.params.instructorId,
    });
    const result = await updateProgramInstructor(
      req.params.programId,
      req.params.instructorId,
      req
    );
    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.delete(
  '/:programId/instructor/:instructorId',
  async (req, res, next) => {
    try {
      await paramsValidator.validateAsync({
        programId: req.params.programId,
        instructorId: req.params.instructorId,
      });
      const result = await deleteProgramInstructor(
        req.params.programId,
        req.params.instructorId
      );
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
);

router.post('/:programId/lesson', async (req, res, next) => {
  try {
    await lessonValidator.validateAsync({
      title: req.body.lesson.title,
      description: req.body.lesson.description,
      timeline: req.body.lesson.timeline,
    });
    await paramsValidator.validateAsync({
      programId: req.params.programId,
    });
    const result = await postProgramLesson(req.params, req);
    res.send('success');
  } catch (e) {
    next(e);
  }
});
router.get('/:programId/lessons', async (req, res, next) => {
  try {
    await paramsValidator.validateAsync({
      programId: req.params.programId,
    });
    const result = await getProgramLesson(req.params.programId);
    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.put('/:programId/lesson/:lessonId', async (req, res, next) => {
  try {
    await lessonValidator.validateAsync({
      title: req.body.lesson.title,
      description: req.body.lesson.description,
      timeline: req.body.lesson.timeline,
    });
    await paramsValidator.validateAsync({
      programId: req.params.programId,
    });

    const result = await updateProgramLesson(
      req.params.programId,
      req.params.lessonId,
      req
    );
    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.delete('/:programId/lesson/:lessonId', async (req, res, next) => {
  try {
    await paramsValidator.validateAsync({
      programId: req.params.programId,
      lessonId: req.params.lessonId,
    });
    const result = await deleteProgramLesson(
      req.params.programId,
      req.params.lessonId
    );
    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.post('/:programId/lesson/:lessonId/concept', async (req, res, next) => {
  try {
    await conceptValidator.validateAsync({
      title: req.body.concept.title,
      url: req.body.concept.url,
      conceptType: req.body.concept.conceptType,
      content: req.body.concept.content,
    });
    await quizDataValidator.validatAsync({
      question: req.body.concept.quizData.question,
      options: req.body.concept.quizData.options,
      answer: req.body.concept.quizData.answer,
    });

    await paramsValidator.validateAsync({
      programId: req.params.programId,
      lessonId: req.params.lessonId,
    });
    const result = postLessonConcept(
      req.params.programId,
      req.params.lessonId,
      req
    );
    res.send(result);
  } catch (e) {
    next(e);
  }
});

router.put(
  '/:programId/lesson/:lessonId/concept/:conceptId',
  async (req, res, next) => {
    try {
      await conceptValidator.validateAsync({
        title: req.body.concept.title,
        url: req.body.concept.url,
        conceptType: req.body.concept.conceptType,
        content: req.body.concept.content,
      });
      await quizDataValidator.validatAsync({
        question: req.body.concept.quizData.question,
        options: req.body.concept.quizData.options,
        answer: req.body.concept.quizData.answer,
      });
      await paramsValidator.validateAsync({
        programId: req.params.programId,
        lessonId: req.params.lessonId,
        conceptId: req.params.conceptId,
      });
      const result = updateLessonConcept(
        req.params.programId,
        req.params.lessonId,
        req.params.conceptId,
        req
      );
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:programId/lesson/:lessonId/concept/:conceptId',
  async (req, res, next) => {
    try {
      await paramsValidator.validateAsync({
        programId: req.params.programId,
        lessonId: req.params.lessonId,
        conceptId: req.params.conceptId,
      });
      const result = await deleteLessonConcept(
        req.params.programId,
        req.params.lessonId,
        req.params.conceptId
      );
      res.send(result);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;

module.exports = router;
