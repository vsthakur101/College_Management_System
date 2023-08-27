const Admin = require("../models/Staff/Admin");
const isAdmin = async (req, res, next) => {
  const { userAuth = null } = req;
  const adminFound = await Admin.findById(userAuth._id);
  if (adminFound?.role === "admin") {
    next();
  } else {
    next(new Error("Access Denied."));
  }
};

module.exports = isAdmin;
