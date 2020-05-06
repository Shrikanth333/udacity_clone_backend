const express = require('express');
const router = express.Router();
const {
  postProgram,
  getPrograms,
  getProgram,
  updateProgram,
  deleteProgram,
} = require('../controllers/program.js');
const {
  postProgramInstructor,
  getProgramInstructor,
  updateProgramInstructor,
  deleteProgramInstructor,
} = require('../controllers/programInstructor.js');
const {
  postProgramLesson,
  getProgramLessons,
  getProgramLesson,
  updateProgramLesson,
  deleteProgramLesson,
  getLessonConcepts,
  getLessonConcept,
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
    if (result._id) {
      res.status(201).send(`${result.title} is created`);
    } else {
      res.status(406).send('Not Accepted');
    }
  } catch (e) {
    next(e);
  }
});



router.get('/', async (req, res) => {
  const result = await getPrograms();
  if (result.length) {
    res.status(200).send(result);
  } else {
    res.status(404).send('Not Found');
  }
});

router.get('/:programId', async (req, res) => {
  const result = await getProgram(req.params.programId);
  // console.log(result)
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send('Not Found');
  }
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
    const result = await updateProgram(req.params.programId, req);
    if (result.length) {
      res.status(201).send(result);
    } else {
      res.status(406).send('Not Accepted');
    }
  } catch (e) {
    next(e);
  }
});

router.delete('/:programId', async (req, res, next) => {
  try {
    await paramsValidator.validateAsync({
      programId: req.params.programId,
    });
    const result = await deleteProgram(req.params.programId, req);
    
    res.status(204).send(`${req.title} is deleted successfully`);
    
        
    
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
    res.status(201).send(`${req.body.instructor.name} is created successfully`);
  } catch (e) {
    next(e);
  }
});

router.get('/:programId/instructors', async (req, res, next) => {
  try {
    await paramsValidator.validateAsync({
      programId: req.params.programId,
    });
    const result = await getProgramInstructor(req.params.programId);
    
    if (result.length) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Not Found');
      }
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
    res.status(201).send(`${req.body.instructor.name} instructor is updated successfully`);
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
      if(result){
      res.status(200).send(`Instructor with Id ${result}  is deleted successfully`);
      }else{
res.status(200).send(`No instructor found with Id ${req.params.instructorId}`)
      }
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
    res.status(201).send(`${req.body.lesson.title} is created successfully`);
  } catch (e) {
    next(e);
  }
});
router.get('/:programId/lessons', async (req, res, next) => {
  try {
    await paramsValidator.validateAsync({
      programId: req.params.programId,
    });
    const result = await getProgramLessons(req.params.programId);
    
    if (result.length) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Not Found');
      }
  } catch (e) {
    next(e);
  }
});
router.get('/:programId/lesson/:lessonId', async (req, res, next) => {
  try {
    await paramsValidator.validateAsync({
      programId: req.params.programId,
    });
    const result = await getProgramLesson(req.params.programId,req.params.lessonId);
    
    if (result) {
        res.status(200).send(result);
      } else {
        res.status(404).send('Not Found');
      }
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
    res.status(201).send(`${req.body.lesson.title} lesson is updated successfully`);
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
    if(result){
    res.status(200).send(`Lesson with Id ${result} is deleted successfully`);
    }else{
     res.status(200).send(`No lesson found with Id ${req.params.lessonId}`)
    }
  } catch (e) {
    next(e);
  }
});
router.get('/:programId/lesson/:lessonId/concepts', async (req, res, next) => {
    try {
      await paramsValidator.validateAsync({
        programId: req.params.programId,
        lessonId: req.params.lessonId,
      });
      const result = await getLessonConcepts(req.params.programId,req.params.lessonId);
      
      if (result.length) {
          res.status(200).send(result);
        } else {
          res.status(404).send('Not Found');
        }
    } catch (e) {
      
      next(e);
    }
  });
  router.get('/:programId/lesson/:lessonId/concept/:conceptId', async (req, res, next) => {
    try {
      await paramsValidator.validateAsync({
        programId: req.params.programId,
        lessonId: req.params.lessonId,
      });
      const result = await getLessonConcept(req.params.programId,req.params.lessonId,req.params.conceptId);
      
      if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send('Not Found');
        }
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
    await quizDataValidator.validateAsync({
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
    res.status(201).send(`${req.body.concept.title} is created successfully`);
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
      await quizDataValidator.validateAsync({
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
      res.status(201).send(`${req.body.concept.title} concept is updated successfully`);
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
      if(result){
      res.status(200).send(`Concept with Id ${result} is deleted successfully`);
      }else{
        res.status(200).send(`No concept found with Id ${req.params.conceptId}`)
      }
    } catch (e) {
      next(e);
    }
  }
);



module.exports = router;
