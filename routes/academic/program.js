const express = require("express");
const {
  createProgram,
  getProgram,
  getSingleProgram,
  updateProgram,
  deleteProgram,
} = require("../../controller/academic/programCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLoggedin");

const ProgramRouter = express.Router();

ProgramRouter.post("/create", isLogin, isAdmin, createProgram);
ProgramRouter.get("/get", isLogin, isAdmin, getProgram);
ProgramRouter.get("/get/:id", isLogin, isAdmin, getSingleProgram);
ProgramRouter.put("/update/:id", isLogin, isAdmin, updateProgram);
ProgramRouter.delete("/delete/:id", isLogin, isAdmin, deleteProgram);

module.exports = ProgramRouter;
