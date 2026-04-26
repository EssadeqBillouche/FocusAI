const PRIORITY_WEIGHT = {
	low: 1,
	medium: 2,
	high: 3,
};

const DAY_IN_MS = 1000 * 60 * 60 * 24;

const computeDeadlineScore = (deadline) => {
	const now = Date.now();
	const remainingDays = Math.ceil((new Date(deadline).getTime() - now) / DAY_IN_MS);

	if (remainingDays < 0) return 6;
	if (remainingDays <= 1) return 5;
	if (remainingDays <= 3) return 4;
	if (remainingDays <= 7) return 3;
	if (remainingDays <= 14) return 2;
	return 1;
};

export const enrichTaskWithSmartData = (task) => {
	const deadlineScore = computeDeadlineScore(task.deadline);
	const priorityScore = PRIORITY_WEIGHT[task.priority] || 1;
	const completionPenalty = task.status === 'completed' ? -3 : 0;

	const smartScore = deadlineScore + priorityScore + completionPenalty;

	let urgencyLabel = 'normal';
	if (smartScore >= 8) urgencyLabel = 'critical';
	else if (smartScore >= 6) urgencyLabel = 'high';
	else if (smartScore >= 4) urgencyLabel = 'medium';

	return {
		...task,
		smart: {
			score: smartScore,
			urgencyLabel,
			isUrgent: ['critical', 'high'].includes(urgencyLabel) && task.status === 'pending',
		},
	};
};

export const sortBySmartScore = (tasks) => {
	return tasks.sort((a, b) => b.smart.score - a.smart.score);
};
