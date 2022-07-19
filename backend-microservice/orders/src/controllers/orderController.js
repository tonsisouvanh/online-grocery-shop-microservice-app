const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { PublishCustomerEvent } = require("../utils/event_publisher");
const Order = require("../models/orderModel");
const { uuid } = require("uuidv4");
// @desc    Add new order
// @route   POST /create
// @access  Admin
const addOrder = asyncHandler(async (req, res) => {
  const { customerId, storeId, products } = req.body;

  const orderId = uuid();

  const newOrder = {
    ...req.body,
    orderId: orderId,
  };

  if (!customerId || !products) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  const createdOrder = await Order.create(newOrder);

  if (createdOrder) {
    res.status(201).json(createdOrder);

    //!Do delete cart for that user//
    //** code here **/
  } else {
    res.status(400);
    throw new Error("Fail to add order");
  }
});

// @desc    update order
// @route   POST /update/:id
// @access  Admin
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { status } = req.body;

  if (!status) {
    res.status(400);
    throw new Error("Can not recieve any inputs");
  }

  if (!order) {
    res.status(400);
    throw new Error("No order found");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    { $set: { status: status } },
    {
      new: true,
    }
  );

  res.status(200).json(updatedOrder);
});

// @desc    Delete order
// @route   DELETE /api/delete/:id
// @access  Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(400);
    throw new Error("No order found");
  }

  await order.remove();

  res.status(200).json({ message: `Deleted order with id: ${req.params.id}` });
});

// @desc    Get all orders
// @route   GET /
// @access  Public
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  return res.status(200).json(orders);
});



const getAllOrdersByCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.query;

  // // check if required fields are not empty
  // if (!phone || !citizenId) {
  //   res.status(400);
  //   throw new Error("Vui lòng điền số điện thoại và cmnd/cccd");
  // }

  const orders = await Order.find(
    {
      customerId: customerId,
    },
    {
      createdAt: 0,
      updatedAt: 0,
    }
  )

  if (!orders || orders.length === 0) {
    res.status(400);
    throw new Error("Customer không đúng");
  }

  res.status(200).json(orders);
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
  const { userId, order, qty } = data;
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
  getAllOrders,
  getAllOrdersByCustomer,
  addOrder,
  updateOrder,
  deleteOrder,
  SubscribeEvents,
};
