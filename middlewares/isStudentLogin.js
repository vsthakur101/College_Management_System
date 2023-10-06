const Student = require("../models/Academic/Student");
const verifyToken = require("../utils/verifyToken");
const isTeacherLogin = async (req, res, next) => {
  //Get Token From Header
  const { authorization = null } = req.headers;
  
  //Verify Token
  if (authorization) {
    let verify = verifyToken(
      authorization.includes("Bearer")
        ? authorization.split(" ")[1]
        : authorization
    );
    //Return Is Verified
    if (verify) {
      //Find the user with current id from token
      let user = await Student.findById(verify.id).select('name email role')
      //Save the user into req
      req.userAuth = user;
      next()
    } else {
      const err = new Error("Token is expired or invalid.");
      next(err);
    }
  } else {
    const err = new Error("Please send authorization token.");
    next(err);
  }
};

module.exports = isTeacherLogin;
