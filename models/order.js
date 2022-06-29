const mongoose = require("mongoose");

const ListOfOrdersSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    }
})


const OrdersSchema = new mongoose.Schema({
    customer_id: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    phone_number: {
        type: Number,
    },
    isTreated: {
        type: Boolean,
        default:false
    },
    total: {
        type: Number,
    },
      placed_at: {
        type: Date,
        default: Date.now()
    },
    listorder: [ListOfOrdersSchema],
})

const Order = mongoose.model("order", OrdersSchema);
module.exports = Order