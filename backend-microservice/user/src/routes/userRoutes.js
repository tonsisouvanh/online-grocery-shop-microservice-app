const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateUser
} = require("../controllers/userController");
const { verifyUser } = require("../middleware/authMiddleware");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/", verifyUser, getMe);
router.put("/update", verifyUser, updateUser);

module.exports = router;
