const jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  User = require('../model/user'),
  { SECRET_KEY } = require('../config');

const SALT_ROUNDS = 10;

async function userExists(email) {
  const user = await User.find({ email });

  return user.length;
}

async function createUser(req, res, next) {
  const { email, username, password } = req.body;
  const emailExists = await userExists(email);

  if (emailExists) throw new Error('Email already exists.');

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({ username, password: hashedPassword, email });

  const createdUser = await user.save();

  const payload = {
    username: createdUser.username,
    isAdmin: createdUser.isAdmin
  };
  const token = await jwt.sign(payload, SECRET_KEY);

  return res.status(203).json({
    message: 'POST /api/auth/register',
    token
  });
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    const payload = {
      username: user.username,
      isAdmin: user.isAdmin
    };
    const token = await jwt.sign(payload, SECRET_KEY);

    return res.status(200).json({
      message: 'POST /api/auth/login',
      token
    });
  }
}

module.exports = {
  createUser,
  loginUser
};
