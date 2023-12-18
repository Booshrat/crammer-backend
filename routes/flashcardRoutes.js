const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcards');

router.post('/', flashcardController.create);
router.get('/', flashcardController.getAll);
// router.get('/:id', flashcardController.getOne);
// router.patch('/:id', flashcardController.update);
router.delete('/:id', flashcardController.delete);

module.exports = router;
