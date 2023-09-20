const Teacher = require("../models/Staff/Teacher");
const isTeacher = async (req, res, next) => {
  const tecaherFound = await Teacher.findById(req?.userAuth?._id);
  if (tecaherFound?.role === "teacher") {
    next();
  } else {
    next(new Error("Access Denied, admin only"));
  }
};

module.exports = isTeacher;
