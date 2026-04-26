import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dbConnect from './config/db.js';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from './presentation/task.routes.js';
import dashboardRoutes from './presentation/dashboard.routes.js';

dotenv.config(); 

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

dbConnect();

app.use("/api-v1/auth", authRoutes)
app.use('/api-v1/tasks', taskRoutes);
app.use('/api-v1/dashboard', dashboardRoutes);

app.use(errorHandler);

export default app;