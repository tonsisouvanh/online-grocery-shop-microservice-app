const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    comment: String,
    img: [{ type: String }],
    point: { type: Number, default: 0 },
    customer: {
      customerId: String,
      name: String,
      img: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("rating", RatingSchema);
