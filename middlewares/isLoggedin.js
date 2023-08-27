const Admin = require("../models/Staff/Admin");
const verifyToken = require("../utils/verifyToken");
const isLogin = async (req, res, next) => {
  //Get Token From Header
  const { authorization = null } = req.headers;
  let isVerified = false;
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
      let user = await Admin.findById(verify.id).select('name email role')
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

module.exports = isLogin;
