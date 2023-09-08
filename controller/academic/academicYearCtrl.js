const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../models/Academic/AcademicYear");
const Admin = require("../../models/Staff/Admin");

const createAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear, createdBy } = req.body;
  let isAcademicYearExist = await AcademicYear.findOne({ name });
  if (isAcademicYearExist) {
    throw new Error("Academic Year Exist.");
  } else {
    let academicYearCreated = await AcademicYear.create({
      name,
      fromYear,
      toYear,
      createdBy: req.userAuth._id,
    });
    let admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(academicYearCreated._id);
    await admin.save()
    res.status(201).json({
      status: "success",
      message: "Academic year created successfully.",
      data: academicYearCreated,
    });
  }
});
const getAcademicYear = AsyncHandler(async (req, res) => {
  let academicYears = await AcademicYear.find();
  res.status(201).json({
    status: "success",
    message: "Academic years fetched successfully.",
    data: academicYears,
  });
});
const getSingleAcademicYear = AsyncHandler(async (req, res) => {
  let academicYear = await AcademicYear.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Academic year fetched successfully.",
    data: academicYear,
  });
});
const updateAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  // checkIfNameExist
  const createAcademicYearFound = await AcademicYear.findOne({ name });
  if (createAcademicYearFound) {
    throw new Error("Academic Year Already Exist.");
  }
  let academicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    {
      name,
      fromYear,
      toYear,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "Academic year updated successfully.",
    data: academicYear,
  });
});
const deleteAcademicYear = AsyncHandler(async (req, res) => {
  let isExist = await AcademicYear.findById(req.params.id);
  if (!isExist) {
    throw new Error("This Academic Year doesn't exist");
  }
  await AcademicYear.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Academic year deleted successfully.",
  });
});

module.exports = {
  createAcademicYear,
  getAcademicYear,
  updateAcademicYear,
  getSingleAcademicYear,
  deleteAcademicYear,
};
