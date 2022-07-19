const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String },
    type: { type: String },
    desc: { type: String },
    price: { type: Number },
    stockNo: { type: Number },
    img: { type: String },
    available: { type: Boolean },
    storeId: { type: String },
    ratings: [{ type: Schema.Types.ObjectId, ref: "rating" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
