const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) {
      return 'Invalid Token';
    } else {
      return decode;
    }
  });
};

module.exports = verifyToken;
