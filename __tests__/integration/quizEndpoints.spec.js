const request = require("supertest");
const app = require("../../server");

describe("quiz endpoint", () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4003, () => {
      console.log("Test server running on port 4003");
      done();
    });
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    server.close(done);
  });

  test("responds to GET and returns all quizes", async () => {
    const response = await request(server).get("/quiz");
    expect(response.statusCode).toBe(200);
  });

  test("fails to return a quiz if not found", async () => {
    const nonExistentQuizId = "some-invalid-id";
    const quiz = await request(server).get("/quiz/6582d1a7868dab6163097cf6");

    if(!quiz) {
      const response = await request(server).get(`/quiz/${nonExistentQuizId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({ error: 'Quiz not found' });
    }
  });

  test("responds to GET and returns a quiz by id", async () => {
    let quizId = "6582d1a7868dab6163097cf6";
    const response = await request(server).get(`/quiz/${quizId}`);
    expect(response.status).toBe(200);
  });

  
});
