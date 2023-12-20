const request = require("supertest");
const app = require("../../server");

describe("user endpoint", () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4001, () => {
      console.log("Test server running on port 4000");
      done();
    });
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    server.close(done);
  });

  test("returns list of users", async () => {
    const response = await request(server).get("/user");
    expect(response.statusCode).toBe(200);
  });

  test("returns a user by name", async () => {
    let userName = "reddy";
    const response = await request(server).get(`/user/${userName}`);
    expect(response.statusCode).toBe(200);
  });

  test("fails to return a user by name if not registered", async () => {
    let userName = "notFound";
    const response = await request(server).get(`/user/${userName}`);
    expect(response.statusCode).toBe(404);
  });
});
