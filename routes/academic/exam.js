const express = require("express");
const {
  createExam,
  fetchAllExams,
  fetchSingleExam,
  examUpdated,
} = require("../../controller/academic/examCtrl");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

const examRouter = express.Router();

examRouter.post("/create", isTeacher, isTeacherLogin, createExam);
examRouter.get("/:id", isTeacher, isTeacherLogin, fetchAllExams);
examRouter.get("/", isTeacher, isTeacherLogin, fetchSingleExam);
examRouter.put("/update/:id", isTeacher, isTeacherLogin, examUpdated);

module.exports = examRouter;
