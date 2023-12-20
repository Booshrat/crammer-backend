const request = require("supertest");
const app = require("../../server");

describe("flashcard endpoint", () => {
    let server;
  
    beforeAll((done) => {
      server = app.listen(4002, () => {
        console.log("Test server running on port 4000");
        done();
      });
    });
  
    afterAll((done) => {
      console.log("Gracefully stopping test server");
      server.close(done);
    });
  
    test("returns all flashcards", async () => {
      const response = await request(server).get("/flashcard");
      expect(response.statusCode).toBe(200);
    });
  });
  