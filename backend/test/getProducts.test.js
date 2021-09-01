//import 'regenerator-runtime/runtime'
import 'babel-polyfill';
import request from 'supertest';
import app from '../src/server.js';
import connectDB from '../src/db.js';
import mongoose from 'mongoose';

jest.setTimeout(10000000)

beforeEach(async () => {
  await connectDB();
});
afterEach(async () => {
  await mongoose.connection.close();
});


describe('POST /api/products', () => {
  describe('get products', () => {
    test('should respond with an array', async (done) => {
      const response = await request(app)
        .get('/api/products')
        .then(async (res) => await res.body);

      expect(response).toBeTruthy();
      expect(typeof response).toBe('object');

      done();
    })
  })
})
