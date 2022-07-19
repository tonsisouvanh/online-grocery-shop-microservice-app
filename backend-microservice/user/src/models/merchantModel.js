const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MerchantSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    username: { type: String },
    password: { type: String },
    phone: { type: String },
    product_types: [{ type: String }], // nhung loai san pham can ban

    // employee: {
    //   emp_name: String,
    //   emp_phone: String,
    //   emp_sex: String,
    // },

    // business_address: {
    //   type: Schema.Types.ObjectId,
    //   ref: "address",
    //   require: true,
    // },

    address: {
      number: String,
      street: String,
      sub_district: String,
      district: String,
      city: String,
    },


    logo: String,
    open_date: { type: Date, default: new Date() },
    founding_date: { type: Date, default: new Date() },
    business_doc: [{ type: String }],
    status: { type: Boolean, default: false },
    productId: [{ type: String, require: true }],


    // products: [
    //   {
    //     productId: { type: String, require: true },
    //     name: { type: String },
    //     banner: { type: String },
    //     price: { type: Number },
    //     unit: {
    //       type: Number,
    //       require: true,
    //     },
    //   },
    // ],
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

module.exports = mongoose.model("merchant", MerchantSchema);
