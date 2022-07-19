const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Rating = require("../models/ratingModel");
const { PublishCustomerEvent } = require("../utils/event_publisher");

// @desc    Add new product
// @route   POST /create
// @access  Admin
const addProduct = asyncHandler(async (req, res) => {
  const { name, type, desc, price, stockNo, img, available, storeId } =
    req.body;


  // if (!name || !price || !storeId || !stockNo) {
  //   res.status(400);
  //   throw new Error("Please add all required fields");
  // }

  const product = await Product.create(req.body);

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Fail to add product");
  }
});

// @desc    update product
// @route   POST /update/:id
// @access  Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("No product found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedProduct);
});

// @desc    Delete product
// @route   DELETE /api/delete/:id
// @access  Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("No product found");
  }

  await product.remove();

  res
    .status(200)
    .json({ message: `Deleted product with id: ${req.params.id}` });
});

// @desc    Get all products
// @route   GET /
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).populate("ratings");

  return res.status(200).json(products);
});

// @desc    Get product by id
// @route   GET /id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const products = await Product.findById(id).populate("ratings");

  return res.status(200).json(products);
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
  const { userId, product, qty } = data;
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
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  SubscribeEvents,
};
