const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcards');

router.post('/', flashcardController.create);
router.get('/', flashcardController.getAll);
router.delete('/:id', flashcardController.delete);

module.exports = router;
