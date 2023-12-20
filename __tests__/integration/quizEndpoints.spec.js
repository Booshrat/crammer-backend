const request = require("supertest");
const app = require("../../server");

describe("quiz endpoint", () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4003, () => {
      console.log("Test server running on port 4000");
      done();
    });
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    server.close(done);
  });

  test("returns all quizes", async () => {
    const response = await request(server).get("/quiz");
    expect(response.statusCode).toBe(200);
  });

//   test('fails to return a quiz if not found', async () => {
//     const nonExistentQuizId = 'some-invalid-id';
//     const response = await request(server).get(`/quiz/${nonExistentQuizId}`);
//     expect(response.statusCode).toBe(404);
//   });
});
