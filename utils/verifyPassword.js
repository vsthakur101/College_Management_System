const bcrypt = require("bcrypt");

const verifyPassword = async (password, userPassword) => {
  let isMatched = await bcrypt.compare(password, userPassword);
  return isMatched;
};

module.exports = verifyPassword;
