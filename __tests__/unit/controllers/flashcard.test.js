const controller = require('../../../controllers/flashcards');
const Flashcard = require('../../../model/flashcard');
const User = require('../../../model/user');
const jwt = require('jsonwebtoken');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }));
const mockRes = { status: mockStatus };

describe('flashcards controller', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('create', () => {
    test('creates a new flashcard with a 201 status code', async () => {
      const testUser = {
        question: 'test',
        answer: 'test',
      };
      jest.spyOn(Flashcard, 'create').mockResolvedValue(testUser);
      const mockReq = { body: { question: 'test', answer: 'test' }, headers: { authorization: 'fakeToken' } };
      await controller.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(201);
    });

    test('handles error during flashcard creation with a 400 status code', async () => {
      jest.spyOn(Flashcard, 'create').mockRejectedValue(new Error('jwt malformed'));
      const mockReq = { body: { question: 'test', answer: 'test' }, headers: { authorization: 'fakeToken' } };
      await controller.create(mockReq, mockRes);
      expect(mockJson).toHaveBeenCalledWith({ error: 'jwt malformed' });
    });

    test('handles missing user during flashcard creation with a 404 status code', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      const mockReq = { body: { question: 'test', answer: 'test' }, headers: { authorization: 'fakeToken' } };
      await controller.create(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('getAll', () => {
    test('gets all flashcards for a user with a 200 status code', async () => {
      // Test the successful retrieval of flashcards for a user
      const testUser = { username: 'testuser' };
      jest.spyOn(jwt, 'verify').mockReturnValue({ username: 'testuser' });
      jest.spyOn(User, 'findOne').mockResolvedValue(testUser);
      jest.spyOn(Flashcard, 'find').mockResolvedValue([{ question: 'test', answer: 'test' }]);
      const mockReq = { headers: { authorization: 'fakeToken' } };
      await controller.getAll(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith([{ question: 'test', answer: 'test' }]);
    });

    test('handles error during flashcard retrieval with a 400 status code', async () => {
      // Test the case where flashcard retrieval fails
      jest.spyOn(jwt, 'verify').mockReturnValue({ username: 'testuser' });
      jest.spyOn(User, 'findOne').mockResolvedValue({ username: 'testuser' });
      jest.spyOn(Flashcard, 'find').mockRejectedValue(new Error('Retrieval failed'));
      const mockReq = { headers: { authorization: 'fakeToken' } };
      await controller.getAll(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Retrieval failed' });
    });

    test('handles missing user during flashcard retrieval with a 404 status code', async () => {
      // Test the case where the user is not found during flashcard retrieval
      jest.spyOn(jwt, 'verify').mockReturnValue({ username: 'testuser' });
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      const mockReq = { headers: { authorization: 'fakeToken' } };
      await controller.getAll(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('deleteFlashcard', () => {
    test('deletes a flashcard with a 200 status code', async () => {
      const testUser = { username: 'testuser', _id: 'user_id' };
      const testFlashcard = { _id: 'flashcard_id' };
      jest.spyOn(jwt, 'verify').mockReturnValue({ username: 'testuser' });
      jest.spyOn(User, 'findOne').mockResolvedValue(testUser);
      jest.spyOn(Flashcard, 'findOneAndDelete').mockResolvedValue(testFlashcard);
      const mockReq = { params: { id: 'flashcard_id' }, headers: { authorization: 'fakeToken' } };
      await controller.delete(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith({ message: 'Flashcard deleted' });
    });

    test('handles error during flashcard deletion with a 400 status code', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue({ username: 'testuser' });
      jest.spyOn(Flashcard, 'findOneAndDelete').mockRejectedValue(new Error('Deletion failed'));
      const mockReq = { params: { id: 'flashcard_id' }, headers: { authorization: 'fakeToken' } };
      await controller.delete(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Deletion failed' });
    });

    test('handles missing user during flashcard deletion with a 404 status code', async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      const mockReq = { params: { id: 'flashcard_id' }, headers: { authorization: 'fakeToken' } };
      await controller.delete(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'User not found' });
    });

    test('handles missing flashcard during flashcard deletion with a 404 status code', async () => {
      const testUser = { username: 'testuser', _id: 'user_id' };
      jest.spyOn(User, 'findOne').mockResolvedValue(testUser);
      jest.spyOn(Flashcard, 'findOneAndDelete').mockResolvedValue(null);
      const mockReq = { params: { id: 'flashcard_id' }, headers: { authorization: 'fakeToken' } };
      await controller.delete(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Flashcard not found' });
    });
  });
});