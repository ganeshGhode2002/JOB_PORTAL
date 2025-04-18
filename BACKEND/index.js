import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDb from './db/connect.js'
import cookieParser from 'cookie-parser';

dotenv.config({})

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true // allow cookies
}));
app.use(cookieParser())






app.get('/', (req, res) => {
  res.send('🌐 Job Portal API is running...');
});

// Start server
app.listen(PORT, () => {
  connectDb();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
