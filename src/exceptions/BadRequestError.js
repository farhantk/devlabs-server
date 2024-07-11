const ClientError = require('./ClientError');

class BadRequestError extends ClientError {
  constructor(message) {
    super(message, 400);
    this.name = this.constructor.name;
  }
}

module.exports = BadRequestError;
