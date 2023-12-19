const Quiz = require('../model/quizModel');

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a quiz by ID
exports.getQuizById = async (req, res) => {
    try {
        const quizId = req.params.id;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Add a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const newQuiz = await Quiz.create(req.body);
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(400).json({ error: 'Invalid request' });
    }
};

// Update a quiz by ID
exports.updateQuizById = async (req, res) => {
    try {
        const quizId = req.params.id;
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(updatedQuiz);
    } catch (error) {
        res.status(400).json({ error: 'Invalid request' });
    }
};

// Delete a quiz by ID
exports.deleteQuizById = async (req, res) => {
    try {
        const quizId = req.params.id;
        const deletedQuiz = await Quiz.findByIdAndRemove(quizId);
        if (!deletedQuiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json({ success: true, message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};