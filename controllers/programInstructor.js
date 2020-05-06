const Program = require('../models/programSchema.js');

const postProgramInstructor = async (reqParams, req) => {
  let doc = await Program.findOne({ _id: reqParams.programId });

  
  doc.instructors.push(req.body);

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
      (instructor.name = req.body.name),
        (instructor.bio = req.body.bio);
      instructor.imageUrl = req.body.imageUrl;
      return instructor;
    }
    return instructor;
  });

  return doc.save();
};
const deleteProgramInstructor = async (programId, instructorId) => {
  let doc = await Program.findOne({ _id: programId });
let deletedId;
  doc.instructors = doc.instructors.filter((instructor) => {
if(instructor._id.toString() === instructorId.toString()){
  deletedId=instructor._id
}
    return instructor._id.toString() !== instructorId.toString();
  });

  doc.save();
  return deletedId
};

module.exports = {
  postProgramInstructor,
  getProgramInstructor,
  updateProgramInstructor,
  deleteProgramInstructor,
 
};
