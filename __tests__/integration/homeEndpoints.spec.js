const request = require('supertest');
const app = require('../../server');

describe('home endpoints', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(() => {
      console.log('Test server running on port 4000');
      done();
    });
  });
  
  afterAll((done) => {
    console.log('Gracefully stopping test server');
    server.close(done);
  });

  test('responds to GET with status 200', (done) => {
    request(server).get('/').expect(200, done);
  });

  test('responds to GET with a title and description', async () => {
    const response = await request(server).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Crammer App');
    expect(response.body.description).toBe('Take part in the quizzes and create your own flashcards');
  });

  test('responds to GET /api/questions/random', async () => {
    const response = await request(server).get('/api/questions/random');

    expect(response.statusCode).toBe(200);
  });

  // test('it should handle error and return a 500 status code GET /api/questions/random', async () => {
  //   let randomIndex = 99;
  //   const response = await request(server).get(`/api/questions/${randomIndex}`);

  //   expect(response.statusCode).toBe(500);

  //   // if (!response) {
  //   //   expect(response.statusCode).toBe(500);
  //   //   expect(response.body.error).toEqual('Internal Server Error');
  //   //   expect(response.console.error).toEqual('Error fetching random question:')
  //   // }
  // });

  test('responds to GET /fetch-and-store-trivia', async () => {
    const response = await request(server).get('/fetch-and-store-trivia');

    expect(response.statusCode).toBe(200);
  });
});
