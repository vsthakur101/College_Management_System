const AsyncHandler = require("express-async-handler");
const Program = require("../../models/Academic/Program");
const Admin = require("../../models/Staff/Admin");
const YearGroup = require("../../models/Academic/YearGroup");


const createYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;

  let isYearGroupExist = await YearGroup.findOne({ name });

  if (isYearGroupExist) {
    throw new Error("Year Group/Graduation already Exist.");
  }
   
    let YearGroupCreated = await YearGroup.create({
      name,
      academicYear,
      createdBy: req.userAuth._id,
    });

    const admin = await Admin.findById(req.userAuth._id);
    if(!admin){
        throw new Error("Admin not found.");
    }
    admin.yearGroups.push(YearGroupCreated._id);
    await admin.save();
    res.status(201).json({
      status: "success",
      message: "YearGroup created successfully.",
      data: YearGroupCreated,
    });
});
const getYearGroup = AsyncHandler(async (req, res) => {
  let YearGroups = await YearGroup.find();
  res.status(201).json({
    status: "success",
    message: "YearGroups fetched successfully.",
    data: YearGroups,
  });
});
const getSingleYearGroup = AsyncHandler(async (req, res) => {
  let FoundYearGroup = await YearGroup.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "YearGroup fetched successfully.",
    data: FoundYearGroup,
  });
});
const updateYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  // checkIfNameExist
  const createYearGroupFound = await YearGroup.findOne({ name });
  if (createYearGroupFound) {
    throw new Error("YearGroup Already Exist.");
  }
  let YearGroupUpdated = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "YearGroup updated successfully.",
    data: YearGroupUpdated,
  });
});
const deleteYearGroup = AsyncHandler(async (req, res) => {
  let isExist = await YearGroup.findById(req.params.id);
  if (!isExist) {
    throw new Error("This YearGroup doesn't exist");
  }
  await YearGroup.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "YearGroup deleted successfully.",
  });
});

module.exports = {
  createYearGroup,
  getYearGroup,
  updateYearGroup,
  getSingleYearGroup,
  deleteYearGroup,
};
