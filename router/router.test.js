const request = require('node:test');
const express = require('express');
const app = express();
const router = require('./useRouter'); // Aggiusta con il percorso al tuo file router

// Mock delle funzioni
jest.mock('bcrypt', () => ({
  hash: jest.fn((password, rounds, callback) => callback(null, 'hashedPassword123'))
}));

jest.mock('../db/db', () => ({
  findUser: jest.fn(),
  saveUser: jest.fn()
}));

const { findUser, saveUser } = require('../db/db');

app.use(express.json()); // middleware per parsing JSON
app.use(router);

describe('POST /register', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 409 if user already exists', async () => {
    findUser.mockResolvedValue({ email: 'test@example.com' });

    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'secure123'
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('User with this email already exists.');
  });

  it('should return 201 after successful registration', async () => {
    findUser.mockResolvedValue(null);
    saveUser.mockResolvedValue({});

    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'secure123'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Successful Registration');
  });

  // Aggiungi altri casi di test come necessario, ad esempio, gestione degli errori di bcrypt, ecc.
});
