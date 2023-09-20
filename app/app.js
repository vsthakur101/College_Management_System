const express = require("express");
const morgan = require("morgan");
const { globalErrorHandler, notFound } = require("../middlewares/globalErrHandler");
const adminRouter = require("../routes/staff/adminRouter");
const academicYearRouter = require("../routes/academic/academicYear");
const academicTermRouter = require("../routes/academic/academicTerm");
const ClassLevelRouter = require("../routes/academic/ClassLevel");
const ProgramRouter = require("../routes/academic/program");
const SubjectRouter = require("../routes/academic/subject");
const yearGroupsRouter = require("../routes/academic/yearGroups");
const teacherRouter = require("../routes/staff/teachers");



const app = express();

//=========Middleware=========
app.use(morgan("dev"));
app.use(express.json()); //Parse Req Data

//==========Routes============

    //==========Admin============
app.use("/api/v1/admin", adminRouter);

app.use('/api/v1/academicYear',academicYearRouter)
app.use('/api/v1/yearGroup',yearGroupsRouter)
app.use('/api/v1/academicTerm',academicTermRouter)
app.use('/api/v1/classLevel',ClassLevelRouter)
app.use('/api/v1/program',ProgramRouter)
app.use('/api/v1/subject',SubjectRouter)
app.use('/api/v1/teacher',teacherRouter);









 
//Not Found Middleware
app.use(notFound);
//Error Middleware
app.use(globalErrorHandler);
module.exports = app;
