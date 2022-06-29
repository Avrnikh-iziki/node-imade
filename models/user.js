const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username cannot be blank']
    },
    phone_number: {
        type: String,
        required: [true, 'phone number cannot be blank'],
    },
    email: {
        type: String,
        required: [true, 'email cannot be blank'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password cannot be blank'],
    },

    isSuperuser: {
        type: Boolean,
        required: true,
        default: false
    },

    refresh: {
        type: String,
        default:null
    },

    date_joined: {
        type: Date,
        default: Date.now()
    }
})


const User = mongoose.model("user", UserSchema);
module.exports = User