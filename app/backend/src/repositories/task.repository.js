import Task from '../models/task.model.js';

export const createTask = (payload) => {
	return Task.create(payload);
};

export const findTasks = (filter = {}, sort = { createdAt: -1 }) => {
	return Task.find(filter).sort(sort);
};

export const findTaskByIdAndUser = (taskId, userId) => {
	return Task.findOne({ _id: taskId, userId });
};

export const updateTaskByIdAndUser = (taskId, userId, updatePayload) => {
	return Task.findOneAndUpdate({ _id: taskId, userId }, updatePayload, {
		new: true,
		runValidators: true,
	});
};

export const deleteTaskByIdAndUser = (taskId, userId) => {
	return Task.findOneAndDelete({ _id: taskId, userId });
};

export const countTasksByFilter = (filter = {}) => {
	return Task.countDocuments(filter);
};

export const findUrgentTasks = (userId, endDate, limit = 5) => {
	return Task.find({
		userId,
		status: 'pending',
		deadline: { $lte: endDate },
	})
		.sort({ deadline: 1, priority: -1 })
		.limit(limit);
};
