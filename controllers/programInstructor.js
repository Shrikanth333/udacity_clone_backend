const Program = require('../models/programSchema.js');

const postProgramInstructor = async (reqParams, req) => {
  let doc = await Program.findOne({ _id: reqParams.programId });

  
  doc.instructors.push(req.body.instructor);

  return doc.save();
};

const getProgramInstructor = async (programId) => {
  const program = await Program.findOne({ _id: programId });
  return program.instructors;
};

const updateProgramInstructor = async (programId, instructorId, req) => {
  let doc = await Program.findOne({ _id: programId });

  doc.Instructors = doc.instructors.map((instructor) => {
    if (instructor._id.toString() === instructorId.toString()) {
      (instructor.name = req.body.instructor.name),
        (instructor.bio = req.body.instructor.bio);
      instructor.imageUrl = req.body.instructor.imageUrl;
      return instructor;
    }
    return instructor;
  });

  return doc.save();
};
const deleteProgramInstructor = async (programId, instructorId) => {
  let doc = await Program.findOne({ _id: programId });

  doc.instructors = doc.instructors.filter((instructor) => {
    return instructor._id.toString() !== instructorId.toString();
  });

  doc.save();
};

module.exports = {
  postProgramInstructor,
  getProgramInstructor,
  updateProgramInstructor,
  deleteProgramInstructor,
 
};
