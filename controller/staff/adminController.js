const AsyncHandler = require("express-async-handler");
const Admin = require("../../models/Staff/Admin");
const genrateWebToken = require("../../utils/genrateToken");
const hashedPassword = require("../../utils/hashPassword");
const verifyPassword = require("../../utils/verifyPassword");

const registerAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Check If Admin Already Exist
  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    return res.json("Admin Exist");
  }

  const Passwordhash = await hashedPassword(password);

  const user = await Admin.create({
    name,
    email,
    password: Passwordhash,
  });

  res.status(201).json({
    status: "success",
    data: user,
    message: "Admin Registered Successfully.",
  });
});
const loginAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.json({ message: "User not found." });
  }
  const isMatched = await verifyPassword(password, user.password);
  if (!isMatched) {
    return res.json({ message: "Invalid login credentials." });
  } else {
    return res.json({
      access_token: genrateWebToken(user._id),
      message: "Admin Logged In Successfully.",
    });
  }
});
const getAllAdminCtrl = AsyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.status(201).json({
    status: "success",
    message: "Admins fetched successfully.",
    data: admins,
  });
});
const getSingleAdminCtrl = AsyncHandler(async (req, res) => {
  const { userAuth = null } = req;
  const admin = await Admin.findById(userAuth._id).select(
    "-password -createdAt -updatedAt"
  ).populate('academicYears');
  if (admin) {
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin Fetched Successfully.",
    });
  } else {
    throw new Error("Admin Not Found.");
  }
});
const updateSingleAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const emailExist = await Admin.findOne({ email });
  if (emailExist) {
    throw new Error("This Email is already taken.");
  } else {
    let passwordHash = await hashedPassword(password);
    let admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
      email,
      password: passwordHash,
      name,
    });
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin updated successfully.",
    });
  }
});
const deleteAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Delete Admin",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
const sudpendTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admin suspend teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
const unSuspendTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admin unsuspend teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
const withdrawTeacherCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admin withdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
const unWithdrawCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admin unwithdraw teacher",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
const publishExamCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admin publish exam result",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
const unPublishExamCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Admin unpublish exam result",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
module.exports = {
  registerAdminCtrl,
  loginAdminCtrl,
  getAllAdminCtrl,
  getSingleAdminCtrl,
  updateSingleAdminCtrl,
  deleteAdminCtrl,
  sudpendTeacherCtrl,
  unSuspendTeacherCtrl,
  withdrawTeacherCtrl,
  unWithdrawCtrl,
  publishExamCtrl,
  unPublishExamCtrl,
};
