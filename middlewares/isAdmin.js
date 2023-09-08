const Admin = require("../models/Staff/Admin");
const isAdmin = async (req, res, next) => {
  const adminFound = await Admin.findById(req?.userAuth?._id);
  if (adminFound?.role === "admin") {
    next();
  } else {
    next(new Error("Access Denied."));
  }
};

module.exports = isAdmin;
