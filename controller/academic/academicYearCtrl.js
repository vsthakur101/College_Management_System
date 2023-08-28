const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../models/Academic/AcademicYear");
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
    res.status(201).json({
      status: "success",
      message: "Academic year created successfully.",
      data: academicYearCreated,
    });
  }
});

module.exports = {
  createAcademicYear,
};
