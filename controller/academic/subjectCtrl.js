const AsyncHandler = require("express-async-handler");
const Program = require("../../models/Academic/Program");
const Admin = require("../../models/Staff/Admin");
const Subject = require("../../models/Academic/Subject");


const createSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;
  let isProgramExist = await Program.findOne({ name });
  if (!isProgramExist) {
    throw new Error("Program not found.");
  }

  let isSubjectExist = await Subject.findOne({ name });

  if (isSubjectExist) {
    throw new Error("Subject Exist.");
  }
   
    let SubjectCreated = await Subject.create({
      name,
      description,
      academicTerm,
      createdBy: req.userAuth._id,
    });

    isProgramExist.subjects.push(SubjectCreated._id);
    await isProgramExist.save()
    res.status(201).json({
      status: "success",
      message: "Subject created successfully.",
      data: SubjectCreated,
    });
});
const getSubject = AsyncHandler(async (req, res) => {
  let Subjects = await Subject.find();
  res.status(201).json({
    status: "success",
    message: "Subjects fetched successfully.",
    data: Subjects,
  });
});
const getSingleSubject = AsyncHandler(async (req, res) => {
  let FoundSubject = await Subject.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Subject fetched successfully.",
    data: FoundSubject,
  });
});
const updateSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm } = req.body;
  // checkIfNameExist
  const createSubjectFound = await Subject.findOne({ name });
  if (createSubjectFound) {
    throw new Error("Subject Already Exist.");
  }
  let SubjectUpdated = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      academicTerm,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "Subject updated successfully.",
    data: SubjectUpdated,
  });
});
const deleteSubject = AsyncHandler(async (req, res) => {
  let isExist = await Subject.findById(req.params.id);
  if (!isExist) {
    throw new Error("This Subject doesn't exist");
  }
  await Subject.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Subject deleted successfully.",
  });
});

module.exports = {
  createSubject,
  getSubject,
  updateSubject,
  getSingleSubject,
  deleteSubject,
};
