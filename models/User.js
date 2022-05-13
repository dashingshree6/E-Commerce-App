const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { isEmail } = require("validator")

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please enter the email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter the valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
        minLength: [6, "Minimum password length must 6 characters"]
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema)