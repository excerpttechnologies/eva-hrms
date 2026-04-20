// src/config/env.ts
import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000'),
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5000/api',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  // Email
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '587'),
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  // Redis
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',

  // File Upload
  FILE_UPLOAD_PATH: process.env.FILE_UPLOAD_PATH || './uploads',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '10485760'),

  // AI Services
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
};

// Validate required env vars
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
const missing = requiredEnvVars.filter(key => !process.env[key]);

if (missing.length > 0 && process.env.NODE_ENV === 'production') {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}
