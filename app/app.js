const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");

const app = express();

//=========Middleware=========
app.use(morgan("dev"));
app.use(express.json()) //Parse Req Data

//==========Routes============

//==========Admin============
app.use("/api/v1/admin", adminRouter);
module.exports = app;
