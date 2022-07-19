const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, sex, phone, address } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    salt,
    sex,
    phone,
    address: address, // need to handle for adding address
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Update user
// @route   PUT /update
// @access  User
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { name, sex, address } = req.body;
  const userExists = await User.findById(userId);

  if (!userExists) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: name,
        sex: sex,
        address: address,
      },
    }
  );
  return res.status(200).json(updatedUser);
});

// @desc    Authenticate a user
// @route   POST /login
// @access  Public
const userAddCart = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});


// @desc    User add cart
// @route   POST /add-cart
// @access  User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});


// @desc    Get user data
// @route   GET /profile
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});




// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUser,
};
