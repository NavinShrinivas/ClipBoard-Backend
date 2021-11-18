const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  groupid: String,
  canteenid: String,
  price: Number,
  items: [
    {
      item_name: String,
      img: String,
      sku_count: Number,
      price: Number,
    },
  ],
});

module.exports = {
  Order: mongoose.model("Order", OrderSchema),
};
