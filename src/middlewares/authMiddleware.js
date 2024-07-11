const jwtToken = require('../auth/jwtToken');

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
      code: 401,
    });
  }

  const token = authorizationHeader.split(' ')[1];

  const decoded = jwtToken.verifyAccessToken(token);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
      code: 401,
    });
  }

  req.user = decoded;
  next();
};

module.exports = authMiddleware;