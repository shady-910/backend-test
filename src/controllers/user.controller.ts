require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User } = require('../db/models');
const logger = require('../config/logger');
const { generateAuthToken } = require('../config/jwt');

/**
 * Log in user
 * @returns {object} - user object with token
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).send('All input is required');
  }
  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      const { id } = user;
      if (isCorrectPassword) {
        generateAuthToken(res, user.id, email);
        return res.status(200).json({
          userId: id, email, authenticated: true,
        });
      }
      return res.status(401).send('Wrong password.');
    }
    return res.status(401).send('Invalid credentials');
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error.message);
  }
};

/**
 * Create a new user
 * @returns {object} - an object that contains userId and success message
 */
exports.register = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  if (!(email && password)) {
    return res.status(400).send('All input is required');
  }
  try {
    // check if user already exist
    const oldUser = await User.findOne({ where: { email } });

    if (oldUser) {
      return res.status(409).send('User already exist. Please login.');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: encryptedPassword,
    });

    return res.status(200).json({
      userId: user.id, email, msg: 'success',
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error.message);
  }
};

/**
 * Log out user
 * @returns {string} - success message
 */
exports.logout = async (req, res) => res
  .clearCookie('token')
  .status(200)
  .json({ message: 'Successfully logged out' });
