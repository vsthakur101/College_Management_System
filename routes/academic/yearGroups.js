const express = require("express");
const {
  createYearGroup,
  getYearGroup,
  getSingleYearGroup,
  updateYearGroup,
  deleteYearGroup,
} = require("../../controller/academic/yearGroupsCtrl");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLoggedin");

const YearGroupRouter = express.Router();

YearGroupRouter.post("/create", isLogin, isAdmin, createYearGroup);
YearGroupRouter.get("/get", isLogin, isAdmin, getYearGroup);
YearGroupRouter.get("/get/:id", isLogin, isAdmin, getSingleYearGroup);
YearGroupRouter.put("/update/:id", isLogin, isAdmin, updateYearGroup);
YearGroupRouter.delete("/delete/:id", isLogin, isAdmin, deleteYearGroup);

module.exports = YearGroupRouter;
