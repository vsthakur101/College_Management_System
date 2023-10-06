const Students = require("../../models/Academic/Student");
const AsyncHandler = require("express-async-handler");
const hashPassword = require("../../utils/hashPassword");
const verifyPassword = require("../../utils/verifyPassword");
const genrateToken = require("../../utils/genrateToken");

//@desc Admin Register Student
//POST /api/v1/students/admin/register
//@access Private admin only

exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check if student already exist
  const student = await Students.findOne({ email });

  if (student) {
    throw new Error("Student already registered.");
  }

  //Hash Password
  const hashedPassword = await hashPassword(password);

  //create
  const studentCreated = await Students.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    message: "Student registered successfully.",
    data: studentCreated,
  });
});

//@desc Student Update Student
//POST /api/v1/students/update/:id
//@access Private student only

exports.studentUpdateProfile = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check if student already exist
  const student = await Students.findOne({ email });

  if (!student) {
    throw new Error("Student does not exist.");
  }
  if (password) {
    //Hash Password
    const hashedPassword = await hashPassword(password);

    //update
    const studentUpdated = await Students.findByIdAndUpdate(
      req.userAuth?._id,
      {
        email,
        password: hashedPassword,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Student updated successfully.",
      data: studentUpdated,
    });
  } else {
    //update
    const studentUpdated = await Students.findByIdAndUpdate(
      req.userAuth?._id,
      {
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Student updated successfully.",
      data: studentUpdated,
    });
  }
});

//@desc Admin Update Student
//POST /api/v1/students/admin/update/:id
//@access Private admin only

exports.adminUpdateStudentProfile = AsyncHandler(async (req, res) => {
  const { classLevels, name, email, academicYear, program, perfectName } =
    req.body;

  //check if student already exist
  const student = await Students.findById(req.params?.studentID);

  if (!student) {
    throw new Error("Student does not exist.");
  }

  //update
  const studentUpdated = await Students.findByIdAndUpdate(
    req.params.studentID,
    {
      $set: {
        name,
        email,
        academicYear,
        program,
        perfectName,
      },
      $addToSet: {
        classLevels: {
            $each: classLevels
        },
      },
    },
    {
      new: true,
    }
  );

  //sendResponse
  res.status(200).json({
    status: "success",
    data: studentUpdated,
    message: "Student Updated Successfully.",
  });
});

//@desc Login Student
//POST /api/v1/students/login
//@access Private students only

exports.loginStudent = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check if student already exist
  const student = await Students.findOne({ email });

  if (!student) {
    throw new Error("Student doesn't exist.");
  }

  //verify password
  const isMatched = await verifyPassword(password, student?.password);

  if (!isMatched) {
    return res.json({ message: "Invalid login credentials." });
  } else {
    res.status(200).json({
      status: "success",
      message: "Student login successfully.",
      data: genrateToken(student?._id),
    });
  }
});

//@desc Get Student Profile
//POST /api/v1/students/profile
//@access Private students only

exports.getStudentProfile = AsyncHandler(async (req, res) => {
  const student = await Students.findById(req.userAuth?._id).select(
    "-password -createdAt -updatedAt"
  );

  if (!student) {
    throw new Error("Student doesn't exist.");
  }
  res.status(200).json({
    status: "success",
    message: "Student profile fetched successfully.",
    data: student,
  });
});

//@desc Get All Student Profile By Admin
//POST /api/v1/students/admin/getAllProfile
//@access Private admin only

exports.getAllStudentProfileByAdmin = AsyncHandler(async (req, res) => {
  const students = await Students.find();

  res.status(200).json({
    status: "success",
    message: "Students profiles are fetched successfully.",
    data: students,
  });
});

//@desc Get Single Student Profile By Admin
//POST /api/v1/students/admin/getProfile
//@access Private admin only

exports.getSingleStudentProfileByAdmin = AsyncHandler(async (req, res) => {
  const student = await Students.findById(req.params?.id);

  if (!student) {
    throw new Error("Student doesn't esxist.");
  }

  res.status(200).json({
    status: "success",
    message: "Students profile are fetched successfully.",
    data: student,
  });
});
