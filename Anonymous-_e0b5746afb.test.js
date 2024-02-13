// Test generated by RoostGPT for test aman12Feb using AI Type Open AI and AI Model gpt-4


import express from "express";
import request from "supertest";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from './User';
import app from './index';

jest.mock('./User');

describe('POST /register', () => {
  const name = 'Test User';
  const email = 'test@test.com';
  const password = 'password123';

  beforeAll(() => {
    mongoose.connect('mongodb://localhost/testDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should successfully register a new user', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/register')
      .send({ name, email, password });

    expect(response.status).toBe(200);
    expect(response.headers['set-cookie']).toBeDefined();
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(User.create).toHaveBeenCalledWith({ name, email, password: expect.any(String) });
  });

  test('should fail to register a user with an existing email', async () => {
    User.findOne.mockResolvedValue({ _id: '123', name, email });

    const response = await request(app)
      .post('/register')
      .send({ name, email, password });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/login');
    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(User.create).not.toHaveBeenCalled();
  });
});
