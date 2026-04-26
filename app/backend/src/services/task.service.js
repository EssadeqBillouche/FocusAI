import AppError from '../utils/AppError.js';
import {
	countTasksByFilter,
	createTask,
	deleteTaskByIdAndUser,
	findTaskByIdAndUser,
	findTasks,
	findUrgentTasks,
	updateTaskByIdAndUser,
} from '../repositories/task.repository.js';
import { enrichTaskWithSmartData, sortBySmartScore } from './smart.service.js';

const buildTaskFilter = (userId, query = {}) => {
	const filter = { userId };

	if (query.status) {
		filter.status = query.status;
	}

	if (query.priority) {
		filter.priority = query.priority;
	}

	if (query.search) {
		filter.$or = [
			{ title: { $regex: query.search, $options: 'i' } },
			{ description: { $regex: query.search, $options: 'i' } },
		];
	}

	return filter;
};

export const createTaskService = async (userId, payload) => {
	const task = await createTask({ ...payload, userId });
	return task;
};

export const getTasksService = async (userId, query = {}) => {
	const filter = buildTaskFilter(userId, query);
	const sort = query.sortByDeadline === 'true' ? { deadline: 1 } : { createdAt: -1 };

	const tasks = await findTasks(filter, sort);
	const mappedTasks = tasks.map((task) => enrichTaskWithSmartData(task.toObject()));

	if (query.smartSort === 'true') {
		return sortBySmartScore(mappedTasks);
	}

	return mappedTasks;
};

export const getTaskByIdService = async (userId, taskId) => {
	const task = await findTaskByIdAndUser(taskId, userId);

	if (!task) {
		throw new AppError('Task not found', 404);
	}

	return enrichTaskWithSmartData(task.toObject());
};

export const updateTaskService = async (userId, taskId, payload) => {
	const task = await updateTaskByIdAndUser(taskId, userId, payload);

	if (!task) {
		throw new AppError('Task not found', 404);
	}

	return enrichTaskWithSmartData(task.toObject());
};

export const deleteTaskService = async (userId, taskId) => {
	const task = await deleteTaskByIdAndUser(taskId, userId);

	if (!task) {
		throw new AppError('Task not found', 404);
	}

	return task;
};

export const getDashboardStatsService = async (userId) => {
	const [total, completed, pending] = await Promise.all([
		countTasksByFilter({ userId }),
		countTasksByFilter({ userId, status: 'completed' }),
		countTasksByFilter({ userId, status: 'pending' }),
	]);

	const urgentLimitDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
	const urgentTasks = await findUrgentTasks(userId, urgentLimitDate, 5);

	return {
		total,
		completed,
		pending,
		completionRate: total ? Number(((completed / total) * 100).toFixed(2)) : 0,
		urgentTasks: urgentTasks.map((task) => enrichTaskWithSmartData(task.toObject())),
	};
};
