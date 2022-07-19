const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getAllOrdersByCustomer
} = require("../controllers/orderController");
// const { verifyUser,verifyAdmin } = require("../middleware/authMiddleware");

router.get("/", getAllOrders);
router.post("/create", addOrder);
router.put("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder);
router.get("/customer-orders", getAllOrdersByCustomer);

module.exports = router;
