const Program = require('../models/programSchema.js');

const postProgram = async (req) => {
  const program = new Program({
    title: req.body.title,
    description: req.body.description,
    prerequsites: req.body.prerequsites,
    requirements: req.body.requirements,
  });

  return program.save();
};

const getProgram = async () => {
  return await Program.find();
};

const updateProgram = async (reqParams, req) => {
  let doc = await Program.findOne({ _id: reqParams.programId });
  doc.title = req.body.title;
   doc.description = req.body.description;
  doc.prerequsites = req.body.prerequsites;
  doc.requirements = req.body.requirements;
  return doc.save();
};
const deleteProgram = async (reqParams) => {
  let programCount=Program.find();
 Program.deleteOne({ _id: reqParams.programId });
 return programCount-Program.find().length;

};

module.exports = { postProgram, getProgram, updateProgram, deleteProgram };
