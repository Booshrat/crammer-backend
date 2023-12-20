const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Get all quizzes
router.get('/', quizController.getAllQuizzes);

// Get a quiz by ID
router.get('/:id', quizController.getQuizById);

// Create a new quiz
router.post('/', quizController.createQuiz);

// Update a quiz by ID
router.put('/:id', quizController.updateQuizById);

// Delete a quiz by ID
router.delete('/:id', quizController.deleteQuizById);

module.exports = router;
