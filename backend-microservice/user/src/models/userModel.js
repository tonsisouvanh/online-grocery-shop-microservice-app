const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {type: String},
    email: {type: String},
    password: {type: String},
    phone: {type: String},
    salt: {type: String},
    sex: {type: String},
    dob: {type: Date},
    address: {
      number: {type: String},
      street: {type: String},
      sub_district: {type: String},
      district: {type: String},
      city: {type: String},
    },
    cart: [
      {
        storeId: { type: String },
        storeName: { type: String },
        products: [
          { 
            _id: { type: String, require: true },
            name: { type: String },
            banner: { type: String },
            price: { type: Number },
            unit: {
              type: Number,
              require: true,
            },
          },
        ],
      },
    ],
    orders: [
      {
        _id: { type: String, require: true },
        amount: { type: Number },
        status: { type: String },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
