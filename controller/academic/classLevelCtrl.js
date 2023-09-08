const AsyncHandler = require("express-async-handler");
const ClassLevel = require("../../models/Academic/ClassLevel");
const Admin = require("../../models/Staff/Admin");

const createClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  let isClassLevelExist = await ClassLevel.findOne({ name });
  if (isClassLevelExist) {
    throw new Error("Class Level Exist.");
  } else {
    let ClassLevelCreated = await ClassLevel.create({
      name,
      description,
      createdBy: req.userAuth._id,
    });
    let admin = await Admin.findById(req.userAuth._id);
    admin.classLevels.push(ClassLevelCreated._id);
    await admin.save()
    res.status(201).json({
      status: "success",
      message: "Class Level created successfully.",
      data: ClassLevelCreated,
    });
  }
});
const getClassLevel = AsyncHandler(async (req, res) => {
  let ClassLevels = await ClassLevel.find();
  res.status(201).json({
    status: "success",
    message: "Class Levels fetched successfully.",
    data: ClassLevels,
  });
});
const getSingleClassLevel = AsyncHandler(async (req, res) => {
  let FoundClassLevel = await ClassLevel.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Class Level fetched successfully.",
    data: FoundClassLevel,
  });
});
const updateClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  // checkIfNameExist
  const createClassLevelFound = await ClassLevel.findOne({ name });
  if (createClassLevelFound) {
    throw new Error("Class Level Already Exist.");
  }
  let ClassLevelUpdated = await ClassLevel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      createdBy: req.userAuth._id,
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "Class Level updated successfully.",
    data: ClassLevelUpdated,
  });
});
const deleteClassLevel = AsyncHandler(async (req, res) => {
  let isExist = await ClassLevel.findById(req.params.id);
  if (!isExist) {
    throw new Error("This Class Level doesn't exist");
  }
  await ClassLevel.findByIdAndDelete(req.params.id);

  res.status(201).json({
    status: "success",
    message: "Class Level deleted successfully.",
  });
});

module.exports = {
  createClassLevel,
  getClassLevel,
  updateClassLevel,
  getSingleClassLevel,
  deleteClassLevel,
};
