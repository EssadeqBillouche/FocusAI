import express from 'express';
import {
	createTask,
	deleteTask,
	getTaskById,
	getTaskRecommendations,
	getSmartPriorityTasks,
	getTasks,
	updateTask,
} from '../controllers/task.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import {
	createTaskValidation,
	updateTaskValidation,
	validateRequest,
} from '../middlewares/validate.middleware.js';

const router = express.Router();

router.use(protectRoute);

router.get('/smart-priority', getSmartPriorityTasks);
router.get('/recommendations', getTaskRecommendations);

router.route('/').get(getTasks).post(createTaskValidation, validateRequest, createTask);

router
	.route('/:id')
	.get(getTaskById)
	.patch(updateTaskValidation, validateRequest, updateTask)
	.delete(deleteTask);

export default router;
