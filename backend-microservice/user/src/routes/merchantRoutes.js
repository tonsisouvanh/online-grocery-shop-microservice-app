const express = require("express");
const router = express.Router();
const {
  registerMerchant,
  loginMerchant,
  getMe,
} = require("../controllers/MerchantController");
const { verifyMerchant } = require("../middleware/authMiddleware");

router.post("/register", registerMerchant);
router.post("/login", loginMerchant);
router.get("/profile",verifyMerchant, getMe);

module.exports = router;
