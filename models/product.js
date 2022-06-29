const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number,
        default:1
    },
    image: {
        type: String
    },
    placed_at: {
        type: Date,
        default: Date.now()
    }
})


const Product = mongoose.model("product", ProductSchema);
module.exports = Product