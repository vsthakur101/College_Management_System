const express = require("express");
const {
  createAcademicTerm,
  getAcademicTerm,
  getSingleAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require("../../controller/academic/academicTermCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLoggedin");

const academicTermRouter = express.Router();

academicTermRouter.post("/create", isLogin, isAdmin, createAcademicTerm);
academicTermRouter.get("/get", isLogin, isAdmin, getAcademicTerm);
academicTermRouter.get("/get/:id", isLogin, isAdmin, getSingleAcademicTerm);
academicTermRouter.put("/update/:id", isLogin, isAdmin, updateAcademicTerm);
academicTermRouter.delete("/delete/:id", isLogin, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;
