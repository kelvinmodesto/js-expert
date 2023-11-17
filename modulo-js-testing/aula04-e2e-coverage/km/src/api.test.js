const {
    after,
    before,
    describe,
    it,
} = require('mocha');
const superTest = require('supertest');
const assert = require('assert');

describe('API Suit Test', () => {
    let app;
    before((done) => {
       app = require('./api');
       app.once('listening', done);
    });
    after(done => app.close(done));
    describe('/contact', () => {
        it('should request the contact route and return HTTP Status 200', async () => {
            const response = await superTest(app).get('/contact').expect(200);
            assert.strictEqual(response.text, 'contact us')
        });
    });
    describe('/login', () => {
        it('should request the login route and return HTTP Status 200', async () => {
            const response = await superTest(app)
                .post('/login')
                .send({ username: 'kelvinmodesto', password: '123' })
                .expect(200);
            assert.strictEqual(response.text, 'log in succeeded')
        });
        it('should request the login route and return HTTP Status 401', async () => {
            const response = await superTest(app)
                .post('/login')
                .send({ username: 'kelvinmodesto', password: '23' })
                .expect(401);
            assert.ok(response.unauthorized)
            assert.strictEqual(response.text, 'log in failed')
        });
    });
    describe('/lorem', () => {
        it('should request /lorem route and return HTTP Status 404', async () => {
            const response = await superTest(app).get('/lorem').expect(404);

            assert.strictEqual(response.text, 'not found!');
        });
    });
});
