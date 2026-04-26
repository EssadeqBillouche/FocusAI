import {
	createTaskService,
	deleteTaskService,
	getTaskByIdService,
	getTaskRecommendationsService,
	getTasksService,
	getSmartPriorityTasksService,
	updateTaskService,
} from '../services/task.service.js';

export const createTask = async (req, res, next) => {
	try {
		const task = await createTaskService(req.user._id, req.body);

		return res.status(201).json({
			status: 'success',
			data: { task },
		});
	} catch (error) {
		next(error);
	}
};

export const getTasks = async (req, res, next) => {
	try {
		const tasks = await getTasksService(req.user._id, req.query);

		return res.status(200).json({
			status: 'success',
			results: tasks.length,
			data: { tasks },
		});
	} catch (error) {
		next(error);
	}
};

export const getTaskById = async (req, res, next) => {
	try {
		const task = await getTaskByIdService(req.user._id, req.params.id);

		return res.status(200).json({
			status: 'success',
			data: { task },
		});
	} catch (error) {
		next(error);
	}
};

export const updateTask = async (req, res, next) => {
	try {
		const task = await updateTaskService(req.user._id, req.params.id, req.body);

		return res.status(200).json({
			status: 'success',
			data: { task },
		});
	} catch (error) {
		next(error);
	}
};

export const deleteTask = async (req, res, next) => {
	try {
		await deleteTaskService(req.user._id, req.params.id);

		return res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (error) {
		next(error);
	}
};

export const getSmartPriorityTasks = async (req, res, next) => {
	try {
		const tasks = await getSmartPriorityTasksService(req.user._id, req.query);

		return res.status(200).json({
			status: 'success',
			results: tasks.length,
			data: { tasks },
		});
	} catch (error) {
		next(error);
	}
};

export const getTaskRecommendations = async (req, res, next) => {
	try {
		const recommendations = await getTaskRecommendationsService(req.user._id, req.query.limit);

		return res.status(200).json({
			status: 'success',
			results: recommendations.length,
			data: { recommendations },
		});
	} catch (error) {
		next(error);
	}
};
