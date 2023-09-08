const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../models/Academic/AcademicTerm");
const Admin = require("../../models/Staff/Admin");

const createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  let isAcademicTermExist = await AcademicTerm.findOne({ name });
  if (isAcademicTermExist) {
    throw new Error("Academic Term Exist.");
  } else {
    let AcademicTermCreated = await AcademicTerm.create({
      name,
      description,
      duration,
      createdBy: req.userAuth._id,
    });
    let admin = await Admin.findById(req.userAuth._id);
    admin.academicTerms.push(AcademicTermCreated._id);
    await admin.save()
    res.status(201).json({
      status: "success",
      message: "Academic term created successfully.",
      data: AcademicTermCreated,
    });
  }
});
const getAcademicTerm = AsyncHandler(async (req, res) => {
  let AcademicTerms = await AcademicTerm.find();
  res.status(201).json({
    status: "success",
    message: "Academic terms fetched successfully.",
    data: AcademicTerms,
  });
});
const getSingleAcademicTerm = AsyncHandler(async (req, res) => {
  let FoundAcademicTerm = await AcademicTerm.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Academic term fetched successfully.",
    data: FoundAcademicTerm,
  });
});
const updateAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  // checkIfNameExist
  const createAcademicTermFound = await AcademicTerm.findOne({ name });
  if (createAcademicTermFound) {
    throw new Error("Academic Term Already Exist.");
  }
  let AcademicTermUpdated = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      duration,
      description,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "Academic Term updated successfully.",
    data: AcademicTermUpdated,
  });
});
const deleteAcademicTerm = AsyncHandler(async (req, res) => {
  let isExist = await AcademicTerm.findById(req.params.id);
  if (!isExist) {
    throw new Error("This Academic Year doesn't exist");
  }
  await AcademicTerm.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Academic Term deleted successfully.",
  });
});

module.exports = {
  createAcademicTerm,
  getAcademicTerm,
  updateAcademicTerm,
  getSingleAcademicTerm,
  deleteAcademicTerm,
};
