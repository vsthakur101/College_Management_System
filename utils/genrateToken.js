const jwt = require("jsonwebtoken");

const genrateWebToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};

module.exports = genrateWebToken;
