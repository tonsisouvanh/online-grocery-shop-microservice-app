const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Rating = require("../models/ratingModel");
const Product = require("../models/productModel");
const { PublishCustomerEvent } = require("../utils/event_publisher");

// @desc    Add new rating
// @route   POST /create
// @access  User
const addRating = asyncHandler(async (req, res) => {
  const {
    productId,
    comment,
    img,
    point,
    customer, // object => { _id: String, name: String, img: String }
  } = req.body;

  if (!comment || !customer) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const rating = await Rating.create(req.body);

  if (rating) {
    await Product.findOneAndUpdate(
      { _id: productId },
      { $addToSet: { ratings: rating._id } }
    );

    res.status(201).json(rating);
  } else {
    res.status(400);
    throw new Error("Fail to add rating");
  }
});

// @desc    update rating
// @route   POST /update/:id
// @access  Admin
const updateRating = asyncHandler(async (req, res) => {
  const rating = await Rating.findById(req.params.id);

  if (!rating) {
    res.status(400);
    throw new Error("No rating found");
  }

  const updatedRating = await Rating.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedRating);
});

// @desc    Delete rating
// @route   DELETE /api/delete/:id
// @access  Admin
const deleteRating = asyncHandler(async (req, res) => {
  const rating = await Rating.findById(req.params.id);

  if (!rating) {
    res.status(400);
    throw new Error("No rating found");
  }

  await rating.remove();

  res.status(200).json({ message: `Deleted rating with id: ${req.params.id}` });
});

// @desc    Get all ratings
// @route   GET /
// @access  Public
const getAllRatings = asyncHandler(async (req, res) => {
  const ratings = await Rating.find({});

  return res.status(200).json(ratings);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// const SubscribeEvents = asyncHandler(async (payload) => {
const SubscribeEvents = async (payload) => {
  const { event, data } = payload;
  const { userId, rating, qty } = data;
  switch (event) {
    case "TEST":
      console.log("test call");
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
  getAllRatings,
  addRating,
  updateRating,
  deleteRating,
  SubscribeEvents,
};
