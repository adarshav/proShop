import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc   post the user with email and password
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});

// @desc    Register a new User
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); //bad request if user exists
    throw new Error('User already exists');
  }

  // user created if not exists in db
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc   Fetch user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not found');
  }
});

// @desc   Update user Profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User Not found');
  }
});

export { authUser, registerUser, getUserProfile, updateUserProfile };
