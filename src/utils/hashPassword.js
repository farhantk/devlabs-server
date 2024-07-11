const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (plainPassword, hashedPassword) => bcrypt.compare(plainPassword, hashedPassword);

module.exports = {
  hashPassword,
  comparePassword,
};
