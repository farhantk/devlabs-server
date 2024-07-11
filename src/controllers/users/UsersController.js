const logger = require('../../utils/logger');
const validator = require('../../validator');
const usersSchema = require('../../validator/users/usersSchema');
const { comparePassword } = require('../../utils/hashPassword');
const jwtToken = require('../../auth/jwtToken');

class UsersController {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async register(req, res) {
    const payload = { ...req.body };
    const validatedPayload = validator.validatePayload(usersSchema.registerUser, payload);
    if (validatedPayload.err) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.err,
        code: 400,
      });
    }

    const isEmailExist = await this.usersRepository.getUserByEmail(validatedPayload.data);
    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        message: 'Email already exist',
        code: 409,
      });
    }

    const result = await this.usersRepository.registerUser(validatedPayload.data);

    return res.status(201).send({
      success: true,
      message: 'User successfully registered',
      code: 201,
      data: result,
    });
  }

  async login(req, res) {
    const payload = { ...req.body };
    const validatedPayload = validator.validatePayload(usersSchema.loginUser, payload);
    if (validatedPayload.err) {
      return res.status(400).json({
        success: false,
        message: validatedPayload.err,
        code: 400,
      });
    }

    const result = await this.usersRepository.getUserByEmailAndRole(validatedPayload.data);

    if (!result) {
      return res.status(400).json({
        success: false,
        message: 'Email or password is incorrect',
        code: 400,
      });
    }

    const isPasswordMatch = await comparePassword(validatedPayload.data.password, result.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Email or password is incorrect',
        code: 400,
      });
    }

    delete result.password;
    const accessToken = jwtToken.generateAccessToken(result);

    return res.status(200).send({
      success: true,
      message: 'User successfully logged in',
      code: 200,
      data: {
        accessToken,
      },
    });
  }

  async getAllUsers(req, res) {
    const result = await this.usersRepository.getAllUsers();

    result.forEach((user) => {
      delete user.password;
    });

    return res.status(200).send({
      success: true,
      message: 'All users successfully fetched',
      code: 200,
      data: result,
    });
  }
}

module.exports = UsersController;
