const mongoose = require('mongoose');
const Flashcard = require('../../../model/flashcard');

const localMongoUri = 'mongodb://127.0.0.1:27017';

describe('Flashcard Model', () => {
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

  describe('Flashcard Schema', () => {
    it('should be invalid if question is empty', async () => {
      const flashcard = new Flashcard({
        answer: 'Sample answer',
        user: new mongoose.Types.ObjectId(), 
      });

      try {
        await flashcard.validate();
      } catch (err) {
        expect(err.errors.question).toBeTruthy();
      }
    });

    it('should be invalid if answer is empty', async () => {
      const flashcard = new Flashcard({
        question: 'Sample question',
        user: new mongoose.Types.ObjectId(), 
      });

      try {
        await flashcard.validate();
      } catch (err) {
        expect(err.errors.answer).toBeTruthy();
      }
    });

    it('should be invalid if user is empty', async () => {
      const flashcard = new Flashcard({
        question: 'Sample question',
        answer: 'Sample answer',
       
      });

      try {
        await flashcard.validate();
      } catch (err) {
        expect(err.errors.user).toBeTruthy();
      }
    });
  });
});