const AsyncHandler = require("express-async-handler");
const Program = require("../../models/Academic/Program");
const Admin = require("../../models/Staff/Admin");

const createProgram = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  let isProgramExist = await Program.findOne({ name });
  if (isProgramExist) {
    throw new Error("Program Exist.");
  } else {
    let ProgramCreated = await Program.create({
      name,
      description,
      duration,
      createdBy: req.userAuth._id,
    });
    let admin = await Admin.findById(req.userAuth._id);
    admin.programs.push(ProgramCreated._id);
    await admin.save()
    res.status(201).json({
      status: "success",
      message: "Program created successfully.",
      data: ProgramCreated,
    });
  }
});
const getProgram = AsyncHandler(async (req, res) => {
  let Programs = await Program.find();
  res.status(201).json({
    status: "success",
    message: "Programs fetched successfully.",
    data: Programs,
  });
});
const getSingleProgram = AsyncHandler(async (req, res) => {
  let FoundProgram = await Program.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Program fetched successfully.",
    data: FoundProgram,
  });
});
const updateProgram = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  // checkIfNameExist
  const createProgramFound = await Program.findOne({ name });
  if (createProgramFound) {
    throw new Error("Program Already Exist.");
  }
  let ProgramUpdated = await Program.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "Program updated successfully.",
    data: ProgramUpdated,
  });
});
const deleteProgram = AsyncHandler(async (req, res) => {
  let isExist = await Program.findById(req.params.id);
  if (!isExist) {
    throw new Error("This Program doesn't exist");
  }
  await Program.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Program deleted successfully.",
  });
});

module.exports = {
  createProgram,
  getProgram,
  updateProgram,
  getSingleProgram,
  deleteProgram,
};
