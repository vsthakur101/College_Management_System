const express = require("express");
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachersAdmin,
  getSingleTeacherAdmin,
  getTeacherProfile,
  updateTeacherProfile
} = require("../../controller/staff/teachersCtrl");
const isLogin = require("../../middlewares/isLoggedin");
const isAdmin = require("../../middlewares/isAdmin");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");



const teacherRouter = express.Router();

teacherRouter.post('/register', isLogin, isAdmin, adminRegisterTeacher);
teacherRouter.post('/login', loginTeacher);
teacherRouter.get('/',isLogin, isAdmin,  getAllTeachersAdmin);
teacherRouter.get('/profile',isTeacherLogin, isTeacher,  getTeacherProfile);
teacherRouter.get('/:teacherID',isLogin, isAdmin,  getSingleTeacherAdmin);
teacherRouter.put('/:teacherID/updateProfile',isTeacherLogin, isTeacher,  updateTeacherProfile);





module.exports = teacherRouter;
