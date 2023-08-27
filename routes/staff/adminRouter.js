const express = require("express");
const {
  registerAdminCtrl,
  loginAdminCtrl,
  getAllAdminCtrl,
  getSingleAdminCtrl,
  updateSingleAdminCtrl,
  deleteAdminCtrl,
  sudpendTeacherCtrl,
  unSuspendTeacherCtrl,
  withdrawTeacherCtrl,
  unWithdrawCtrl,
  publishExamCtrl,
  unPublishExamCtrl,
} = require("../../controller/staff/adminController");
const isLogin = require("../../middlewares/isLoggedin");
const isAdmin = require("../../middlewares/isAdmin");
const adminRouter = express.Router();

//========Admin Register==========
adminRouter.post("/register", registerAdminCtrl);
//========Admin Login=========
adminRouter.post("/login", loginAdminCtrl);
//========Get All Admin==========
adminRouter.get("/getAllAdmin", isLogin, getAllAdminCtrl);

//========Get Single Admin==========
adminRouter.get("/getSingle", isLogin,isAdmin,  getSingleAdminCtrl);

//========Update Admin==========
adminRouter.put("/updateAdmin/:id", updateSingleAdminCtrl);

//========Delete Admin==========
adminRouter.delete("/deleteAdmin/:id", deleteAdminCtrl);

//========Admin Suspending Teacher==========
adminRouter.put("/suspend/teacher/:id", sudpendTeacherCtrl);

//========Admin Unsuspending Teacher==========
adminRouter.put("/unsuspend/teacher/:id", unSuspendTeacherCtrl);

//========Admin Withdrawing Teacher==========
adminRouter.put("/withdraw/teacher/:id", withdrawTeacherCtrl);
//========Admin UnWithdrawing Teacher==========
adminRouter.put("/unwithdraw/teacher/:id", unWithdrawCtrl);
//========Admin Publish Exam Result==========
adminRouter.put("/publish/exam/:id", publishExamCtrl);
//========Admin Unpublish Exam Result==========
adminRouter.put("/unpublish/exam/:id", unPublishExamCtrl);

module.exports = adminRouter;
