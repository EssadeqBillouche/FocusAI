const PRIORITY_WEIGHT = {
	low: 1,
	medium: 2,
	high: 3,
};

const DAY_IN_MS = 1000 * 60 * 60 * 24;
const DUE_SOON_DAYS = 2;
const STALE_TASK_DAYS = 10;

const countDaysFromNow = (dateValue) => {
	const now = Date.now();
	return Math.ceil((new Date(dateValue).getTime() - now) / DAY_IN_MS);
};

const countTaskAgeInDays = (createdAt) => {
	const now = Date.now();
	return Math.floor((now - new Date(createdAt).getTime()) / DAY_IN_MS);
};

const escalatePriority = (priority) => {
	if (priority === 'low') return 'medium';
	if (priority === 'medium') return 'high';
	return 'high';
};

export const computeSmartPriority = (task) => {
	if (task.status === 'completed') {
		return {
			priority: 'low',
			reason: 'Task already completed',
		};
	}

	const daysToDeadline = countDaysFromNow(task.deadline);
	const taskAge = countTaskAgeInDays(task.createdAt);

	let priority = 'low';
	let reason = 'Far deadline';

	if (daysToDeadline < 0) {
		priority = 'high';
		reason = 'Overdue task';
	} else if (daysToDeadline <= DUE_SOON_DAYS) {
		priority = 'medium';
		reason = 'Due soon';
	}

	if (taskAge >= STALE_TASK_DAYS && daysToDeadline <= 7) {
		priority = escalatePriority(priority);
		reason = 'Pending for long time and deadline approaching';
	}

	if (daysToDeadline <= 1) {
		priority = escalatePriority(priority);
		reason = 'Deadline within 24 hours';
	}

	return { priority, reason };
};

export const enrichTaskWithSmartData = (task) => {
	const computed = computeSmartPriority(task);
	const daysToDeadline = countDaysFromNow(task.deadline);
	const score = (PRIORITY_WEIGHT[computed.priority] || 1) * 100 - daysToDeadline;

	return {
		...task,
		smart: {
			computedPriority: computed.priority,
			reason: computed.reason,
			daysToDeadline,
			score,
			isUrgent: computed.priority === 'high' && task.status === 'pending',
		},
	};
};

export const sortBySmartScore = (tasks) => {
	return [...tasks].sort((a, b) => b.smart.score - a.smart.score);
};

export const getRecommendedTasks = (tasks, limit = 5) => {
	return sortBySmartScore(tasks)
		.filter((task) => task.status === 'pending')
		.sort((a, b) => {
			const priorityDiff = (PRIORITY_WEIGHT[b.smart.computedPriority] || 1) - (PRIORITY_WEIGHT[a.smart.computedPriority] || 1);
			if (priorityDiff !== 0) return priorityDiff;

			const deadlineDiff = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
			if (deadlineDiff !== 0) return deadlineDiff;

			return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
		})
		.slice(0, limit);
};

export const buildDashboardInsights = (tasks) => {
	const completed = tasks.filter((task) => task.status === 'completed').length;
	const pending = tasks.filter((task) => task.status === 'pending').length;
	const total = tasks.length;
	const completionRate = total ? Number(((completed / total) * 100).toFixed(2)) : 0;

	const priorityBuckets = {
		high: 0,
		medium: 0,
		low: 0,
	};

	tasks.forEach((task) => {
		priorityBuckets[task.smart.computedPriority] += 1;
	});

	return {
		total,
		completed,
		pending,
		completionRate,
		chartData: [
			{ name: 'Completed', value: completed },
			{ name: 'Pending', value: pending },
		],
		priorityData: [
			{ name: 'High', value: priorityBuckets.high },
			{ name: 'Medium', value: priorityBuckets.medium },
			{ name: 'Low', value: priorityBuckets.low },
		],
	};
};
