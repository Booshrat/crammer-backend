const controller = require('../../../controllers/users')
const User = require('../../../model/user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('user controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns  all users with a 200 status code', async () => {
            let testUsers = [
                {
                    username: "test1",
                    password: "test1",
                    score: 0,
                },
                {
                    username: "test2",
                    password: "test2",
                    score: 15,
                }
            ]
            User.find = jest.fn().mockImplementationOnce(() => ({ sort: jest.fn().mockResolvedValueOnce(testUsers) }));
            jest.spyOn(User, 'find')
                .mockResolvedValue(testUsers);
            await controller.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testUsers);
        })
    });

    describe('getUserByUsername', () => {
        test('it returns a user by username with a 200 status code', async () => {
            let testUser = {
                _id: "test1",
                username: "test1",
                password: "test1",
                score: 0
            }
            jest.spyOn(User, 'findOne')
                .mockResolvedValue(testUser);
            const mockReq = { params: { username: 'test1' } }
            await controller.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testUser);
        })
        test('it returns a 404 if username is incorrect', async () => {
            jest.spyOn(User, 'findOne')
                .mockResolvedValue(null);
            const errReq = { params: { username: 'test2' } }
            await controller.show(errReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: 'No user here' })
        })
    });

    describe('register', () => {
        test('it creates a new user with a 201 status code', async () => {
            let testUser = {
                username: 'crammer',
                password: 'crammer',
            }
            jest.spyOn(User, 'create')
                .mockResolvedValue(testUser);
            const mockReq = { body: { username: 'crammer', password: 'crammer' } }
            await controller.register(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(testUser);
        })
        test('it returns a 500 if register is not working', async () => {
            jest.spyOn(User, 'create')
                .mockResolvedValue(null);
            const errReq = { params: { username: 'test2' } }
            await controller.show(errReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: 'No user here' })
        })
    });

    describe('update', () => {
        it('should return a 404 with error if id is not valid', async () => {
            let testUser = 'test1'
            jest.spyOn(User, 'findOneAndUpdate')
                .mockResolvedValue(testUser);
            const mockReq = { params: { id: testUser }, body: { username: "example" } };
            await controller.update(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ error: 'No id here' });
        });
        test('it updates a user with a valid ID and returns 200 status code', async () => {
            let testUser = 1;
            jest.spyOn(User, 'findOneAndUpdate')
            .mockResolvedValue(testUser);
            const mockReq = { params: { id: testUser }, body: { username: "example" } };
            await controller.update(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(1);
        })
    });

    // describe('updateUserScore', () => {
    //     test('it returns a 200 status code and a message', async () => {
    //         let testUser = {
    //             username: 'crammer',
    //             password: 'crammer',
    //         }

    //         jest.spyOn(User, 'updateScore')
    //             .mockResolvedValue(testUser);
    //         const mockReq = { body: { username: "crammer", new_score: 100 } }
    //         await controller.updateUserScore(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //         expect(mockJson).toHaveBeenCalledWith({ msg: `Update score of user crammer: Successful` });
    //     })
    // });
})
