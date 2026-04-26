export const formatDate = (value) => {
	if (!value) return 'No deadline';

	return new Date(value).toLocaleDateString('fr-FR', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
};

export const getPriorityClass = (priority) => {
	if (priority === 'high') return 'bg-red-100 text-red-700';
	if (priority === 'medium') return 'bg-amber-100 text-amber-700';
	return 'bg-emerald-100 text-emerald-700';
};

export const getInitials = (firstName, lastName) => {
	const f = firstName?.[0] || '';
	const l = lastName?.[0] || '';
	return `${f}${l}`.toUpperCase() || 'U';
};
