const express = require("express");
const router = express.Router();
const {
  getAllRatings,
  addRating,
  updateRating,
  deleteRating
} = require("../controllers/ratingController");
// const { verifyUser, verifyAdmin } = require("../middleware/authMiddleware");

router.get("/", getAllRatings);
router.post("/create", addRating);
router.put("/update/:id", updateRating);
router.delete("/delete/:id", deleteRating);

module.exports = router;
