const Program = require('../models/programSchema.js');

const postProgram = async (req) => {
  const program = new Program({
    title: req.body.title,
    description: req.body.description,
    prerequesites: req.body.prerequesites || "",
    requirements: req.body.requirements || "",
  });
  
  return program.save();
};

const getPrograms = async () => {
  return await Program.find();
};

const getProgram = async (programId) => {
  
  return await Program.findOne({_id:programId});
};

const updateProgram = async (programId, req) => {
  let doc = await Program.findOne({ _id: programId });
  doc.title = req.body.title;
   doc.description = req.body.description;
  doc.prerequesites = req.body.prerequesites;
  doc.requirements = req.body.requirements;
  return doc.save();
};
const deleteProgram = async (programId) => {
  let programCount=Program.find().length;
 await Program.deleteOne({ _id: programId });
 return programCount-Program.find().length;

};

module.exports = { postProgram, getPrograms,getProgram, updateProgram, deleteProgram };
