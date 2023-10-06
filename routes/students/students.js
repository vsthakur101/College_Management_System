const express = require("express");
const {
  adminRegisterStudent,
  loginStudent,
  getStudentProfile,
  getAllStudentProfileByAdmin,
  getSingleStudentProfileByAdmin,
  studentUpdateProfile,
  adminUpdateStudentProfile
} = require("../../controller/students/studentsCtrl");
const isLogin = require("../../middlewares/isLoggedin");
const isAdmin = require("../../middlewares/isAdmin");

const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");

const studentRouter = express.Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, getStudentProfile);
studentRouter.get(
  "/admin/getAllStudents",
  isLogin,
  isAdmin,
  getAllStudentProfileByAdmin
);
studentRouter.get(
  "/admin/getStudent/:id",
  isLogin,
  isAdmin,
  getSingleStudentProfileByAdmin
);
studentRouter.put(
  "/update/:id",
  isStudentLogin,
  isStudent,
  studentUpdateProfile
);
studentRouter.put(
  "/admin/update/:id",
  isLogin,
  isAdmin,
  adminUpdateStudentProfile
);

module.exports = studentRouter;
