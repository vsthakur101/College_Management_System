const express = require("express");
const {
  createAcademicYear,
  getAcademicYear,
  getSingleAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../../controller/academic/academicYearCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLoggedin");

const academicYearRouter = express.Router();

academicYearRouter.post("/create", isLogin, isAdmin, createAcademicYear);
academicYearRouter.get("/get", isLogin, isAdmin, getAcademicYear);
academicYearRouter.get("/get/:id", isLogin, isAdmin, getSingleAcademicYear);
academicYearRouter.put("/update/:id", isLogin, isAdmin, updateAcademicYear);
academicYearRouter.delete("/delete/:id", isLogin, isAdmin, deleteAcademicYear);

module.exports = academicYearRouter;
