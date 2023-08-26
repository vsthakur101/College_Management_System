const AsyncHandler = require("express-async-handler");
const Admin = require("../../models/Staff/Admin");
const registerAdminCtrl = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Check If Admin Already Exist
  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    return res.json("Admin Exist");
  }

  const user = await Admin.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: "success",
    data: user,
  });
});
const loginAdminCtrl = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.json({ message: "User not found." });
  }
  if (user && (await user.verifyPassword(password))) {
    return res.json({ data: user });
  } else {
    return res.json({ message: "Invalid login credentials." });
  }
});
const getAllAdminCtrl = AsyncHandler((req, res) => {
  res.status(201).json({
    status: "success",
    data: "All Admins",
  });
});
const getSingleAdminCtrl = AsyncHandler((req, res) => {
  res.status(201).json({
    status: "success",
    data: "Single Admin",
  });
});
const updateSingleAdminCtrl = (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Update Admin",
    });
  } catch (error) {
    res.json({
      status: "failed",
      error: error.message,
    });
  }
};
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
