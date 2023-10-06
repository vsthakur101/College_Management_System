const AsyncHandler = require("express-async-handler");
const Teacher = require('../../models/Staff/Teacher');
const hashPassword = require("../../utils/hashPassword");
const verifyPassword = require("../../utils/verifyPassword");
const genrateWebToken = require("../../utils/genrateToken");

exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
    const {name , email, password} = req.body;
    //check if teacher already exists
    const teacher = await Teacher.findOne({email});

    if(teacher){
        throw new Error("Teacher already employed.");
    }

    //Hash Password
    const hashedPassword = hashPassword(password);

    //Create Teacher
    const teacherCreated = Teacher.create({
        name,
        email,
        password
    });

    //send teacher data
    res.status(201).json({
        status: 'success',
        message: 'Teacher registered sucessfully.',
        data: teacherCreated
    })
})

/* 
@desc login a teacher
@route POST /api/v1/teachers/login
@access Public
*/

exports.loginTeacher = AsyncHandler(async (req, res) =>{
    const {email, password} = req.body;
    const teacher  = await Teacher.findOne({email});
    if(!teacher){
        return res.json({message: "Invalid Login Crendentials."});
    }
    const isMatched = await verifyPassword(password, teacher?.password);
    if(!isMatched){
        return res.json({message: 'Invalid Login Crendentials.'});
    }else{
        res.status(200).json({
            status: 'success',
            message: 'Teacher login successfully.',
            data: genrateWebToken(teacher?._id)
        })
    }
})

/* 
@desc get all teacher
@route POST /api/v1/teachers
@access Private, admin only
*/

exports.getAllTeachersAdmin = AsyncHandler(async (req,res) =>{
    const teachers = await Teacher.find();
    res.status(200).json({
        status: 'success',
        message: 'Teachers fetched successfully.',
        data: teachers
    })
})

/* 
@desc get single teacher
@route POST /api/v1/teacher
@access Private, admin only
*/

exports.getSingleTeacherAdmin = AsyncHandler(async (req,res) =>{
    const teacherID = req.params?.tecaherID;
    const teacher = await Teacher.findById(teacherID);
    if(!teacher){
        throw new Error('Teacher not found.')
    }
    res.status(200).json({
        status: 'success',
        message: 'Teacher found successfully.',
        data: teacher
    })
})

/* 
@desc get teacher profile
@route POST /api/v1/teacher
@access Private, teacher only
*/

exports.getTeacherProfile = AsyncHandler(async (req,res) =>{
    const teacher = await Teacher.findById(req.userAuth._id).select('-password -createdAt -updatedAt');
    if(!teacher){
        throw new Error('Teacher not found.')
    }
    res.status(200).json({
        status: 'success',
        message: 'Teacher profile fetched successfully.',
        data: teacher
    })
})

/* 
@desc update teacher profile
@route POST /api/v1/teacher
@access Private, teacher only
*/

exports.updateTeacherProfile = AsyncHandler(async (req,res) =>{
    const {email, name, password} = req.body
    const teacherExists = await Teacher.findOne({email});

    if(!teacherExists){
        throw new Error('Teacher not found.')
    }
    if(password){
        const teacher = Teacher.findByIdAndUpdate(req.userAuth._id,{
            email,
            password: await hashPassword(password),
            name,
        },{
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            message: 'Teacher profile updated successfully.',
            data: teacher
        })
    }else{
        const teacher = Teacher.findByIdAndUpdate(req.userAuth._id,{
            email,
            name
        },{
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            message: 'Teacher profile updated successfully.',
            data: teacher
        })
    }
})
/*
@desc Admin update teacher profile
@route POST /api/v1/teacher
@access Private, admin only
*/

exports.updateTeacherProfileByAdmin = AsyncHandler(async (req,res) =>{
    const {program, classLevel, academicYear, subject} = req.body
    const teacherExists = await Teacher.findById(req.params.teacherID);

    if(!teacherExists){
        throw new Error('Teacher not found.')
    }

    //if teacher is withdrawn

    if(teacherExists.isWitdrawn){
        throw new Error('Teacher is withdrawn');
    }

    //assign program
    if(program){
        teacherExists.program = program;
        await teacherExists.save();
    }

     //assign classLevel
     if(classLevel){
        teacherExists.classLevel = classLevel;
        await teacherExists.save();
    }

     //assign Academic Year
     if(academicYear){
        teacherExists.academicYear = academicYear;
        await teacherExists.save();
    }

     //assign Academic Year
     if(subject){
        teacherExists.subject = subject;
        await teacherExists.save();
    }

    res.status(200).json({
        status: 'success',
        message: 'Teacher profile updated successfully.',
        data: teacherExists
    })
})