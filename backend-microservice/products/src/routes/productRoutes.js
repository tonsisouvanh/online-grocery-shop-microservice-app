const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById
} = require("../controllers/productController");
// const { verifyUser,verifyAdmin } = require("../middleware/authMiddleware");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/create", addProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
