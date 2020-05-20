const Program = require('../models/programSchema.js');

const postProgramInstructor = async (reqParams, req) => {
  let doc = await Program.findOne({ _id: reqParams.programId });

  doc.instructors.push(req.body);
  const instructor = doc.instructors[doc.instructors.length - 1];

  await doc.save();
  return instructor;
};

const getProgramInstructor = async (programId) => {
  const program = await Program.findOne({ _id: programId });
  return program.instructors;
};

const updateProgramInstructor = async (programId, instructorId, req) => {
  return  await Program.findOneAndUpdate({ _id: programId , 'instructors._id': instructorId
},
  { $set: { 'instructors.$':req.body} },{new: true, useFindAndModify: false});

  
};
const deleteProgramInstructor = async (programId, instructorId) => {
  let doc = await Program.findOne({ _id: programId });
  let deletedId;

  doc.instructors = doc.instructors.filter((instructor) => {
    if (instructor._id.toString() === instructorId.toString()) {
      deletedId = instructor._id;
    }
    return instructor._id.toString() !== instructorId.toString();
  });
 

  await doc.save();
  return deletedId;
};

module.exports = {
  postProgramInstructor,
  getProgramInstructor,
  updateProgramInstructor,
  deleteProgramInstructor,
};
