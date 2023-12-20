const request = require('supertest');
const app = require('../../server');

describe('home endpoints', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4000, () => {
      console.log('Test server running on port 4000');
      done();
    });
  });
  
  afterAll((done) => {
    console.log('Gracefully stopping test server');
    server.close(done);
  });

  test('responds to GET / with status 200', (done) => {
    request(server).get('/').expect(200, done);
  });

  test('responds to GET / with a title and description', async () => {
    const response = await request(server).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Crammer App');
    expect(response.body.description).toBe('Take part in the quizzes and create your own flashcards');
  });
});
