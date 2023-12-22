const controller = require('../../../controllers/quizController');
const Quiz = require('../../../model/quizModel');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }));
const mockRes = { status: mockStatus };

describe('quiz controller', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('getAllQuizzes', () => {
    test('gets all quizzes with a 200 status code', async () => {
      const testQuizzes = [{ title: 'Quiz 1' }, { title: 'Quiz 2' }];
      jest.spyOn(Quiz, 'find').mockResolvedValue(testQuizzes);
      await controller.getAllQuizzes({}, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testQuizzes);
    });

    test('handles error during quiz retrieval with a 500 status code', async () => {
      jest.spyOn(Quiz, 'find').mockRejectedValue(new Error('Internal server error'));
      await controller.getAllQuizzes({}, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('getQuizById', () => {
    test('gets a quiz by ID with a 200 status code', async () => {
      const testQuizId = 'quiz_id';
      const testQuiz = { title: 'Test Quiz' };
      jest.spyOn(Quiz, 'findById').mockResolvedValue(testQuiz);
      const mockReq = { params: { id: testQuizId } };
      await controller.getQuizById(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(testQuiz);
    });

    test('handles error when quiz is not found with a 404 status code', async () => {
      const testQuizId = 'nonexistent_quiz_id';
      jest.spyOn(Quiz, 'findById').mockResolvedValue(null);
      const mockReq = { params: { id: testQuizId } };
      await controller.getQuizById(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Quiz not found' });
    });

    test('handles error during quiz retrieval with a 500 status code', async () => {
      const testQuizId = 'quiz_id';
      jest.spyOn(Quiz, 'findById').mockRejectedValue(new Error('Internal server error'));
      const mockReq = { params: { id: testQuizId } };
      await controller.getQuizById(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});