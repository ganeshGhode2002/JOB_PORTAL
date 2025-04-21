import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDb from './db/connect.js'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import companyRoutes from './routes/company.routes.js';

dotenv.config({})

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:8000', // frontend URL
  credentials: true // allow cookies
}));

app.use(cookieParser())






app.use("/user", userRoutes)
app.use("/api/v1/company", companyRoutes)



// Start server
app.listen(PORT, () => {
  connectDb();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
