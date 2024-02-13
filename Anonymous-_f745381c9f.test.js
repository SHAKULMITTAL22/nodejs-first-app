// Test generated by RoostGPT for test aman12Feb using AI Type Open AI and AI Model gpt-4


import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import request from 'supertest';

import app from './index';

jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('GET /', () => {
  const isAuthenticated = jest.fn();
  
  beforeEach(() => {
    isAuthenticated.mockClear();
  });

  it('renders logout page successfully', async () => {
    const user = { name: 'John Doe' };
    isAuthenticated.mockImplementation((req, res, next) => {
      req.user = user;
      next();
    });

    const res = await request(app)
      .get('/')
      .expect(200);

    expect(res.text).toContain('John Doe');
    expect(isAuthenticated).toBeCalled();
  });

  it('returns error when user is not authenticated', async () => {
    isAuthenticated.mockImplementation((req, res, next) => {
      const err = new Error('User not authenticated');
      err.status = 401;
      next(err);
    });

    const res = await request(app)
      .get('/')
      .expect(401);

    expect(res.text).toContain('User not authenticated');
    expect(isAuthenticated).toBeCalled();
  });
});
