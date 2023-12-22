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
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;