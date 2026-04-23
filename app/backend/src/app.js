import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from "./routes/auth.routes.js"

dotenv.config(); 

const app = express();
app.use(express.json());
dbConnect();
app.use(errorHandler);
app.use("/api-v1/auth", authRoutes)

export default app;