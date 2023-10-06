const Student = require("../models/Academic/Student");
const isStudent = async (req, res, next) => {
  const studentFound = await Student.findById(req?.userAuth?._id);
  if (studentFound?.role === "student") {
    next();
  } else {
    next(new Error("Access Denied, student only"));
  }
};

module.exports = studentFound;
