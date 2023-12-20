// const controller = require('../../../controllers/flashcards')
// const Flashcard = require('../../../model/flashcard');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

// const mockSend = jest.fn();
// const mockJson = jest.fn();
// const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
// const mockRes = { status: mockStatus }

// describe('user controller', () => {
//     beforeEach(() => jest.clearAllMocks());

//     afterAll(() => jest.resetAllMocks());

//     describe('create', () => {
//         test('it creates a new flashcard with a 201 status code', async () => {
//             let testUser = {
//                 question: 'test',
//                 answer: 'test',
//             }
//             jest.spyOn(Flashcard, 'create')
//                 .mockResolvedValue(testUser);
//             const mockReq = { body: { question: 'test', answer: 'test' } }
//             await controller.create(mockReq, mockRes);
//             expect(mockStatus).toHaveBeenCalledWith(201);
//             expect(mockJson).toHaveBeenCalledWith(testUser);
//         })
//     });
// })

const controller = require('../../../controllers/flashcards')
const Flashcard = require('../../../model/flashcard');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { create, getAll, deleteFlashcard } = require('./yourModule'); // Replace 'yourModule' with the actual module path

jest.mock('jsonwebtoken');

describe('create function', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {
        question: 'Test question',
        answer: 'Test answer',
      },
      headers: {
        authorization: 'mockedToken',
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should create a new flashcard with a 201 status code', async () => {
    // Mock jwt.verify and User.findOne
    jwt.verify.mockReturnValue({ username: 'testuser' });
    jest.spyOn(User, 'findOne').mockResolvedValue({ _id: 'mockedUserId' });
    jest.spyOn(Flashcard, 'create').mockResolvedValue({ _id: 'mockedFlashcardId' });
    jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue();

    await create(mockReq, mockRes);

    // Expectations for a successful creation
    expect(jwt.verify).toHaveBeenCalledWith('mockedToken', process.env.SECRET);
    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    expect(Flashcard.create).toHaveBeenCalledWith({
      question: 'Test question',
      answer: 'Test answer',
      user: 'mockedUserId',
    });
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith('mockedUserId', {
      $push: { flashcards: 'mockedFlashcardId' },
    });
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ _id: 'mockedFlashcardId' });

    // Restore the original implementations after the test
    jwt.verify.mockRestore();
    User.findOne.mockRestore();
    Flashcard.create.mockRestore();
    User.findByIdAndUpdate.mockRestore();
  });

  it('should handle errors and return a 400 status code', async () => {
    // Mock jwt.verify and simulate an error during flashcard creation
    jwt.verify.mockReturnValue({ username: 'testuser' });
    jest.spyOn(User, 'findOne').mockResolvedValue({ _id: 'mockedUserId' });
    jest.spyOn(Flashcard, 'create').mockRejectedValue(new Error('Mocked error'));

    await create(mockReq, mockRes);

    // Expectations for error handling
    expect(jwt.verify).toHaveBeenCalledWith('mockedToken', process.env.SECRET);
    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    expect(Flashcard.create).toHaveBeenCalledWith({
      question: 'Test question',
      answer: 'Test answer',
      user: 'mockedUserId',
    });
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: expect.any(String) });

    // Restore the original implementations after the test
    jwt.verify.mockRestore();
    User.findOne.mockRestore();
    Flashcard.create.mockRestore();
  });
});

describe('getAll function', () => {
  // Similar structure for setup as create function

  it('should get all flashcards with a 200 status code', async () => {
    // Mock jwt.verify and User.findOne
    jwt.verify.mockReturnValue({ username: 'testuser' });
    jest.spyOn(User, 'findOne').mockResolvedValue({ _id: 'mockedUserId' });
    jest.spyOn(Flashcard, 'find').mockResolvedValue([{ _id: 'mockedFlashcardId' }]);

    await getAll(mockReq, mockRes);

    // Expectations for a successful retrieval
    expect(jwt.verify).toHaveBeenCalledWith('mockedToken', process.env.SECRET);
    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    expect(Flashcard.find).toHaveBeenCalledWith({ user: 'mockedUserId' });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([{ _id: 'mockedFlashcardId' }]);

    // Restore the original implementations after the test
    jwt.verify.mockRestore();
    User.findOne.mockRestore();
    Flashcard.find.mockRestore();
  });

  it('should handle errors and return a 400 status code', async () => {
    // Mock jwt.verify and simulate an error during flashcard retrieval
    jwt.verify.mockReturnValue({ username: 'testuser' });
    jest.spyOn(User, 'findOne').mockResolvedValue({ _id: 'mockedUserId' });
    jest.spyOn(Flashcard, 'find').mockRejectedValue(new Error('Mocked error'));

    await getAll(mockReq, mockRes);

    // Expectations for error handling
    expect(jwt.verify).toHaveBeenCalledWith('mockedToken', process.env.SECRET);
    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    expect(Flashcard.find).toHaveBeenCalledWith({ user: 'mockedUserId' });
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: expect.any(String) });

    // Restore the original implementations after the test
    jwt.verify.mockRestore();
    User.findOne.mockRestore();
    Flashcard.find.mockRestore();
  });
});

describe('deleteFlashcard function', () => {
  // Similar structure for setup as create function

  it('should delete a flashcard with a 200 status code', async () => {
    // Mock jwt.verify, User.findOne, Flashcard.findOneAndDelete, and User.findByIdAndUpdate
    jwt.verify.mockReturnValue({ username: 'testuser' });
    jest.spyOn(User, 'findOne').mockResolvedValue({ _id: 'mockedUserId' });
    jest.spyOn(Flashcard, 'findOneAndDelete').mockResolvedValue({ _id: 'mockedFlashcardId' });
    jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValue();

    await deleteFlashcard(mockReq, mockRes);

    // Expectations for a successful deletion
    expect(jwt.verify).toHaveBeenCalledWith('mockedToken', process.env.SECRET);
    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    expect(Flashcard.findOneAndDelete).toHaveBeenCalledWith({
      _id: 'mockedFlashcardId',
      user: 'mockedUserId',
    });
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith('mockedUserId', {
      $pull: { flashcards: 'mockedFlashcardId' },
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Flashcard deleted' });

    // Restore the original implementations after the test
    jwt.verify.mockRestore();
    User.findOne.mockRestore();
    Flashcard.findOneAndDelete.mockRestore();
    User.findByIdAndUpdate.mockRestore();
  });

  it('should handle errors and return a 400 status code', async () => {
    // Mock jwt.verify, User.findOne, simulate an error during flashcard deletion
    jwt.verify.mockReturnValue({ username: 'test' })
  })
})
