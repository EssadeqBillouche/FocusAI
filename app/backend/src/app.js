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
const allowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:5173')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
			return;
		}

		callback(new Error('Not allowed by CORS'));
	},
	credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

dbConnect();

app.use("/api-v1/auth", authRoutes)
app.use('/api-v1/tasks', taskRoutes);
app.use('/api-v1/dashboard', dashboardRoutes);

// Alias routes without version prefix for compatibility
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(errorHandler);

export default app;