const express = require("express");
const {
  createClassLevel,
  getClassLevel,
  getSingleClassLevel,
  updateClassLevel,
  deleteClassLevel,
} = require("../../controller/academic/ClassLevelCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLoggedin");

const ClassLevelRouter = express.Router();

ClassLevelRouter.post("/create", isLogin, isAdmin, createClassLevel);
ClassLevelRouter.get("/get", isLogin, isAdmin, getClassLevel);
ClassLevelRouter.get("/get/:id", isLogin, isAdmin, getSingleClassLevel);
ClassLevelRouter.put("/update/:id", isLogin, isAdmin, updateClassLevel);
ClassLevelRouter.delete("/delete/:id", isLogin, isAdmin, deleteClassLevel);

module.exports = ClassLevelRouter;
