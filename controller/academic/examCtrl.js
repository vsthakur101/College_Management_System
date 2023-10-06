const Exam = require("../../models/Academic/Exam");
const Teacher = require("../../models/Staff/Teacher");
const AsyncHandler = require("express-async-handler");

/* 
@desc Create Exam
@route POST /api/v1/exam/create
@access Private teacher only
*/

exports.createExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    academicYear,
    classLevel,
  } = req.body;

  //find teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);
  if (!teacherFound) {
    throw new Error("Teacher not found.");
  }

  //exam exist
  const examExist = await Exam.findOne({ name });
  if (!examExist) {
    throw new Error("Exam not found.");
  }

  //create
  const examCreated = new Exam({
    name,
    description,
    academicTerm,
    academicYear,
    classLevel,
    duration,
    examDate,
    examStatus,
    examTime,
    examType,
    subject,
    program,
    createdBy: req.userAuth?._id,
  });
  teacherFound.examsCreated.push(examCreated._id);
  await examCreated.save();
  await teacherFound.save();
  res.status(201).json({
    status: "success",
    message: "Exam created.",
    data: examCreated,
  });
});

/* 
@desc Create Exam
@route POST /api/v1/exam/update
@access Private teacher only
*/

exports.updateExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    academicYear,
    classLevel,
  } = req.body;

  //check name exist
  const examFound = await Exam.findOne({name});
  if (!examFound) {
    throw new Error("Exam not found.");
  }

  //create
  const examUpdated = Exam.findByIdAndUpdate(req.params.id,{
    name,
    description,
    academicTerm,
    academicYear,
    classLevel,
    duration,
    examDate,
    examStatus,
    examTime,
    examType,
    subject,
    program,
    updatedBy: req.userAuth?._id,
  },{
    new : true
  });
  await examUpdated.save();
  res.status(201).json({
    status: "success",
    message: "Exam updated successfully.",
    data: examUpdated,
  });
});

/* 
@desc Get All Exam
@route POST /api/v1/exams
@access Private teacher only
*/

exports.fetchAllExams = AsyncHandler(async (req, res) => {
  const allExams = await Exam.find();
  res.status(200).json({
    status: "success",
    message: "Exams fetched successfully.",
    data: allExams,
  });
});

/* 
@desc Get Single Exam
@route POST /api/v1/exam
@access Private teacher only
*/

exports.fetchSingleExam = AsyncHandler(async (req, res) => {
  const examFound = await Exam.findById(req.params.id);
  if(!examFound){
    throw new Error('Exam not found').
  }
  res.status(200).json({
    status: "success",
    message: "Exams found successfully.",
    data: examFound,
  });
});
