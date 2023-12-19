const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    incorrectAnswers: {
        type: [String],
        required: true,
    },
    question: {
        text: {
            type: String,
            required: true,
        },
    },
    tags: {
        type: [String],
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    regions: {
        type: [String],
        default: [],
    },
    isNiche: {
        type: Boolean,
        default: false,
    },
    
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;