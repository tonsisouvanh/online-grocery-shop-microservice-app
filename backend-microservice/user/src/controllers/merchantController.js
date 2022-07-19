const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Merchant = require("../models/merchantModel");

// @desc    Register new merchant
// @route   POST /register
// @access  Public
const registerMerchant = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    username,
    password,
    phone,
    product_types,
    address,

    logo,
    open_date,
    founding_date,
    business_doc,
    status,
    productId,
  } = req.body;

  if (!name || !email || !username || !password) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  // Check if merchant exists
  const merchantExists = await Merchant.findOne({ email });

  if (merchantExists) {
    res.status(400);
    throw new Error("Account already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create merchant
  const merchant = await Merchant.create({
    name,
    email,
    username,
    password: hashedPassword,
    phone,
    product_types,
    address: address,
    logo,
    open_date,
    founding_date,
    business_doc,
    status,
    productId,
  });
  if (merchant) {
    res.status(201).json({
      _id: merchant.id,
      name: merchant.name,
      email: merchant.email,
      status: merchant.status,
      token: generateToken(merchant._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid merchant data");
  }
});

// @desc    Authenticate a merchant
// @route   POST /login
// @access  Public
const loginMerchant = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for merchant email
  const merchant = await Merchant.findOne({ email });
  if (merchant && (await bcrypt.compare(password, merchant.password))) {
    const { status } = merchant;
    if (!status) {
      throw new Error("Your account has not activated yet!");
    }
    res.json({
      _id: merchant.id,
      name: merchant.name,
      email: merchant.email,
      token: generateToken(merchant._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get merchant data
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

// const SubscribeEvents = asyncHandler(async (payload) => {
const SubscribeEvents = async (payload) => {
  // const { event, data } = payload;

  // const { userId, product, qty } = data;
  const event = "TEST";
  switch (event) {
    case "TEST":
      // console.log("event test");
      break;

    default:
      break;
  }
};

// async GetOrderPayload(userId, order, event) {
//   console.log(userId, order, event);
//   if (order) {
//     const payload = {
//       event: event,
//       data: { userId, order },
//     };
//     return payload;
//   } else {
//     return FormatData({ error: "No order available" });
//   }
// }

module.exports = {
  registerMerchant,
  loginMerchant,
  getMe,
  SubscribeEvents,
};
