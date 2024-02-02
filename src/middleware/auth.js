require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    logger.error(error);
    return res.status(401).send('Invalid Token');
  }
  return next();
};

module.exports = verifyToken;
