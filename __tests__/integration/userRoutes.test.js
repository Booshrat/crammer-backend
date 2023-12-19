const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../../server')
const env = require('dotenv')
const resetTestDB = require('./config.js')
env.config()

// beforeEach(async () => {
//     await mongoose.connect('mongodb://localhost:27017');
// });

// afterEach(async () => {
//     await mongoose.connection.close();
// });

// describe("GET /users", () => {
//     it("should return all users", async () => {
//         const res = await request(app).get("/users");
//         expect(res.statusCode).toBe(200);
//         expect(res.body.length).toBeGreaterThan(0);
//     });
// });

describe('users endpoints', () => {

    beforeEach(async () => {
        await resetTestDB.resetTestDB()
    });

    // beforeAll(async () => {
    //     api = app.listen(5000, () => console.log('Test server running on port 5000'))
    // });

    afterEach(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    test('Should check server up', async (done) => {
        const res = await request(api).get('/')
        expect(res.statusCode).toEqual(200)
        .end(done)
    })
  });
