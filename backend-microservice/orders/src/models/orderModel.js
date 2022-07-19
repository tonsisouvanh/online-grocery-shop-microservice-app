const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    orderId: { type: String },
    customerId: { type: String },
    storeId: { type: String },
    total: { type: Number, default: 0 },
    status: { type: String, default: "pending" },
    payment: { type: String },
    products: [
      {
        productId: { type: String },
        name: { type: String },
        qty: { type: Number },
        price: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", OrderSchema);
