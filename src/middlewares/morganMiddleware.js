// src/middlewares/morganMiddleware.js
const morgan = require('morgan');
const logger = require('../utils/logger');

// Define the stream for Morgan to use Winston's logger
const stream = {
  write: (message) => logger.info(message.trim()),
};

// Skip logging during tests
const skip = () => {
  const env = process.env.ENV || 'development';
  return env === 'test';
};

// Build the Morgan middleware
const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);

module.exports = morganMiddleware;
