const mongoose = require('mongoose');
const Quiz = require('../../../model/quizModel');

const localMongoUri = 'mongodb://127.0.0.1:27017';

describe('Quiz Model', () => {
  beforeAll(async () => {
    await mongoose.connect(localMongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the local MongoDB database');
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db.dropDatabase();
      await mongoose.connection.close();
      console.log('Disconnected from the local MongoDB database');
    }
  });

  describe('Quiz Schema', () => {
    it('should be invalid if category is empty', async () => {
      const quiz = new Quiz({
        id: '1',
        correctAnswer: 'A',
        incorrectAnswers: ['B', 'C'],
        question: { text: 'Sample question' },
      });

      try {
        await quiz.validate();
      } catch (err) {
        expect(err.errors.category).toBeTruthy();
      }
    });

    it('should be invalid if id is empty', async () => {
      const quiz = new Quiz({
        category: 'General',
        correctAnswer: 'A',
        incorrectAnswers: ['B', 'C'],
        question: { text: 'Sample question' },
      });

      try {
        await quiz.validate();
      } catch (err) {
        expect(err.errors.id).toBeTruthy();
      }
    });

    it('should be invalid if correctAnswer is empty', async () => {
      const quiz = new Quiz({
        category: 'General',
        id: '1',
        incorrectAnswers: ['B', 'C'],
        question: { text: 'Sample question' },
      });

      try {
        await quiz.validate();
      } catch (err) {
        expect(err.errors.correctAnswer).toBeTruthy();
      }
    });
  });
});