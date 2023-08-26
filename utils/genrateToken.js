const jwt = require("jsonwebtoken");

const genrateWebToken = (id) => {
  return jwt.sign({ id }, "secretKey", { expiresIn: "1d" });
};

module.exports = genrateWebToken;