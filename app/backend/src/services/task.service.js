import AppError from '../utils/AppError.js';
import {
	createTask,
	deleteTaskByIdAndUser,
	findTaskByIdAndUser,
	findTasks,
	updateTaskByIdAndUser,
} from '../repositories/task.repository.js';
import {
	buildDashboardInsights,
	enrichTaskWithSmartData,
	getRecommendedTasks,
	sortBySmartScore,
} from './smart.service.js';

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
	const tasks = await findTasks({ userId }, { createdAt: -1 });
	const smartTasks = tasks.map((task) => enrichTaskWithSmartData(task.toObject()));
	const insights = buildDashboardInsights(smartTasks);

	return {
		...insights,
		urgentTasks: getRecommendedTasks(smartTasks, 5),
	};
};

export const getSmartPriorityTasksService = async (userId, query = {}) => {
	const filter = buildTaskFilter(userId, query);
	const tasks = await findTasks(filter, { deadline: 1, createdAt: 1 });

	return tasks.map((task) => enrichTaskWithSmartData(task.toObject()));
};

export const getTaskRecommendationsService = async (userId, limit = 5) => {
	const tasks = await findTasks({ userId }, { deadline: 1, createdAt: 1 });
	const smartTasks = tasks.map((task) => enrichTaskWithSmartData(task.toObject()));

	return getRecommendedTasks(smartTasks, Number(limit) || 5);
};

export const getDashboardInsightsService = async (userId) => {
	const tasks = await findTasks({ userId }, { createdAt: -1 });
	const smartTasks = tasks.map((task) => enrichTaskWithSmartData(task.toObject()));

	return {
		...buildDashboardInsights(smartTasks),
		recommendedTasks: getRecommendedTasks(smartTasks, 5),
	};
};
