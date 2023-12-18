const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../server')
const env = require('dotenv')
env.config()

beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017');
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /users", () => {
    it("should return all users", async () => {
        const res = await request(app).get("/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
