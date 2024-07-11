const db = require('../../../configs/databases/postgres/db');
const validator = require('../../../utils/validator');
const commandModel = require('../repositories/command_model');
const Command = require('../repositories/command');

const command = new Command(db);

const registerUser = async (req, res) => {
  const payload = { ...req.body };
  const validatedPayload = validator.validatePayload(commandModel.registerUser, payload);
  if (validatedPayload.err) {
    return res.status(400).json({
      success: false,
      message: validatedPayload.err,
      code: 400,
    });
  }

  const result = await command.registerUser(db, validatedPayload.data);

  return res.status(201).send({
    success: true,
    message: 'User successfully registered',
    code: 201,
    data: result,
  });
}

const loginUser = async (req, res) => {
  const payload = { ...req.body };
  const validatedPayload = validator.validatePayload(commandModel.loginUser, payload);
  if (validatedPayload.err) {
    return res.status(400).json({
      success: false,
      message: validatedPayload.err,
      code: 400,
    });
  }

  const user = await command.getUserByEmail(db, validatedPayload.data);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email or password',
      code: 400,
    });
  }
  const isPasswordMatch = await bcrypt.compare(validatedPayload.data.password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email or password',
      code: 400,
    });
  }

  return res.status(200).send({
    success: true,
    message: 'User successfully logged in',
    code: 200,
    data: user,
  });
}

module.exports = {
  registerUser,
  loginUser,
};
