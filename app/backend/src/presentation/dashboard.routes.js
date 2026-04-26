import express from 'express';
import { getDashboardInsights, getDashboardStats } from '../controllers/dashboard.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/insights', protectRoute, getDashboardInsights);
router.get('/stats', protectRoute, getDashboardStats);

export default router;
