const Program = require('../models/programSchema.js');

const postProgramLesson = async (reqParams, req) => {
  let doc = await Program.findOne({ _id: reqParams.programId });

  doc.lessons = [...doc.lessons, req.body.lesson];
  doc.instructors = req.body.instructors;

  return doc.save();
};

const getProgramLesson = async (programId) => {
  const program = await Program.findOne({ _id: programId });
  return program.lessons;
};

const updateProgramLesson = async (programId, lessonId, req) => {
  let doc = await Program.findOne({ _id: programId });

  doc.lessons = doc.lessons.map((lesson) => {
    if (lesson._id.toString() === lessonId.toString()) {
      lesson.title = req.body.lesson.title;
      lesson.description = req.body.lesson.description;
      lesson.timeline = req.body.lesson.timeline;
      return lesson;
    }
    return lesson;
  });

  return doc.save();
};
const deleteProgramLesson = async (programId, lessonId) => {
  let doc = await Program.findOne({ _id: programId });
let deletedId
  doc.lessons = doc.lessons.filter((lesson) => {
if(lesson._id.toString() === lessonId.toString()){
  deletedId=lesson._id
}
    return lesson._id.toString() !== lessonId.toString();
  });

  doc.save();
  return deletedId;
};

const getLessonConcepts = async (programId, lessonId) => {
  let doc = await Program.findOne({ _id: programId });
  let concepts;
  doc.lessons.forEach((lesson) => {
    if (lesson._id.toString() === lessonId.toString()) {
      concepts = lesson.concepts;
    }
  });

  return concepts;
};

const getLessonConcept = async (programId, lessonId, conceptId) => {
  let doc = await Program.findOne({ _id: programId });

  let singleConcept;
  doc.lessons.forEach((lesson) => {
    if (lesson._id.toString() === lessonId.toString()) {
      lesson.concepts.forEach((concept) => {
        if (concept._id.toString() === conceptId.toString()) {
          singleConcept = concept;
        }
      });
    }
  });
  return singleConcept;
};

const postLessonConcept = async (programId, lessonId, req) => {
  let doc = await Program.findOne({ _id: programId });

  doc.lessons = doc.lessons.map((lesson) => {
    if (lesson._id.toString() === lessonId.toString()) {
      lesson.concepts.push(req.body.concept);

      return lesson;
    }
    return lesson;
  });
  doc.save();
};

const updateLessonConcept = async (programId, lessonId, conceptId, req) => {
  let doc = await Program.findOne({ _id: programId });

  doc.lessons = doc.lessons.map((lesson) => {
    if (lesson._id.toString() === lessonId.toString()) {
      lesson.concepts = lesson.concepts.map((concept) => {
        if (concept._id.toString() === conceptId.toString()) {
          concept.title = req.body.concept.title;
          concept.url = req.body.concept.url;
          concept.conceptType = req.body.concept.conceptType;
          concept.content = req.body.concept.content;
          concept.quizData = req.body.concept.quizData;

          return concept;
        }
        return concept;
      });

      return lesson;
    }
    return lesson;
  });
  doc.save();
};

const deleteLessonConcept = async (programId, lessonId, conceptId) => {
  let doc = await Program.findOne({ _id: programId });
let deletedId
  doc.lessons = doc.lessons.map((lesson) => {
    if (lesson._id.toString() === lessonId.toString()) {
      lesson.concepts = lesson.concepts.filter((concept) => {
        if(concept._id.toString() === conceptId.toString())
        {
          deletedId=concept._id
        }
        return concept._id.toString() !== conceptId.toString();
      });

      return lesson;
    }
    return lesson;
  });
  doc.save();
  return  deletedId;
};

module.exports = {
  postProgramLesson,
  getProgramLesson,
  updateProgramLesson,
  deleteProgramLesson,
  postLessonConcept,
  getLessonConcepts,
  getLessonConcept,
  updateLessonConcept,
  deleteLessonConcept,
};
