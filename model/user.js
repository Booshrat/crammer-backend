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
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }]
}, {})

const User = mongoose.model('User', userSchema)

module.exports = User 
