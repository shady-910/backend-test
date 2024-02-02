const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRY } = process.env;

const generateAuthToken = (res, userId, email) => {
  const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  return res.cookie('token', token, {
    expires: new Date(Date.now() + JWT_EXPIRY),
    secure: process.env.NODE_ENV === 'production', // set to true if your using https
    httpOnly: true,
  });
};

module.exports = { generateAuthToken };
