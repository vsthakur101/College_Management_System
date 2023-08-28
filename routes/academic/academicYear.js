const express = require("express");
const {
  createAcademicYear,
} = require("../../controller/academic/academicYearCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLoggedin");

const academicYearRouter = express.Router();

academicYearRouter.post("/create", isLogin, isAdmin, createAcademicYear);

module.exports = academicYearRouter;
