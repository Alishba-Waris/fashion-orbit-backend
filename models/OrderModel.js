const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  items: [
    {
      id: { type: String, required: true },
      image: {type: String, require: true},
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: {
     type: Number, 
     required: true 
    },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  postalcode: {
    type: String,
    require: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
