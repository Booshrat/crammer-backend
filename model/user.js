const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "A user must have an email"],
    },
    password: {
        type: String,
        required: [true, "A user needs a password"]
    },
    score: {
        type: Number,
        min: [0, "User score cannot be below zero"]
    }

}, {})

const User = mongoose.model('User', userSchema)

module.exports = User
