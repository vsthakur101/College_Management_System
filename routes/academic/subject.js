const express = require("express");
const {
  createSubject,
  getSubject,
  getSingleSubject,
  updateSubject,
  deleteSubject,
} = require("../../controller/academic/subjectCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLoggedin");

const SubjectRouter = express.Router();

SubjectRouter.post("/create", isLogin, isAdmin, createSubject);
SubjectRouter.get("/get", isLogin, isAdmin, getSubject);
SubjectRouter.get("/get/:id", isLogin, isAdmin, getSingleSubject);
SubjectRouter.put("/update/:id", isLogin, isAdmin, updateSubject);
SubjectRouter.delete("/delete/:id", isLogin, isAdmin, deleteSubject);

module.exports = SubjectRouter;
