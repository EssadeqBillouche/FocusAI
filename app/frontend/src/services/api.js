const API_URL = (import.meta.env.VITE_API_URL || '/api-v1').trim();

const getAuthHeaders = () => {
	const token = localStorage.getItem('taskiq_token');

	return {
		'Content-Type': 'application/json',
		...(token ? { Authorization: `Bearer ${token}` } : {}),
	};
};

const handleResponse = async (res) => {
	const data = await res.json().catch(() => null);

	if (!res.ok) {
		if (res.status === 401) {
			localStorage.removeItem('taskiq_token');
			localStorage.removeItem('taskiq_user');
		}

		const error = new Error(data?.message || 'Request failed');
		error.response = { status: res.status, data };
		throw error;
	}

	return { status: res.status, data };
};

export const authApi = {
	register: async (payload) => {
		const res = await fetch(`${API_URL}/auth/register`, {
			method: 'POST',
			headers: getAuthHeaders(),
			body: JSON.stringify(payload),
		});

		return handleResponse(res);
	},

	login: async (payload) => {
		const res = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			headers: getAuthHeaders(),
			body: JSON.stringify(payload),
		});

		return handleResponse(res);
	},

	me: async () => {
		const res = await fetch(`${API_URL}/auth/me`, {
			method: 'GET',
			headers: getAuthHeaders(),
		});

		return handleResponse(res);
	},
};

export const tasksApi = {
	getAll: async (params = {}) => {
		const query = new URLSearchParams(params).toString();
		const res = await fetch(`${API_URL}/tasks${query ? `?${query}` : ''}`, {
			method: 'GET',
			headers: getAuthHeaders(),
		});

		return handleResponse(res);
	},

	getSmartPriority: async (params = {}) => {
		const query = new URLSearchParams(params).toString();
		const res = await fetch(`${API_URL}/tasks/smart-priority${query ? `?${query}` : ''}`, {
			method: 'GET',
			headers: getAuthHeaders(),
		});

		return handleResponse(res);
	},

	getRecommendations: async (limit = 5) => {
		const res = await fetch(`${API_URL}/tasks/recommendations?limit=${limit}`, {
			method: 'GET',
			headers: getAuthHeaders(),
		});

		return handleResponse(res);
	},

	getById: async (taskId) => {
		const res = await fetch(`${API_URL}/tasks/${taskId}`, {
			method: 'GET',
			headers: getAuthHeaders(),
		});

		return handleResponse(res);
	},

	create: async (payload) => {
		const res = await fetch(`${API_URL}/tasks`, {
			method: 'POST',
			headers: getAuthHeaders(),
			body: JSON.stringify(payload),
		});

		return handleResponse(res);
	},

	update: async (taskId, payload) => {
		const res = await fetch(`${API_URL}/tasks/${taskId}`, {
			method: 'PATCH',
			headers: getAuthHeaders(),
			body: JSON.stringify(payload),
		});

		return handleResponse(res);
	},

	delete: async (taskId) => {
		const res = await fetch(`${API_URL}/tasks/${taskId}`, {
			method: 'DELETE',
			headers: getAuthHeaders(),
		});

		return handleResponse(res);
	},
};

export const dashboardApi = {
	getStats: async () => {
		const res = await fetch(`${API_URL}/dashboard/stats`, {
			method: 'GET',
			headers: getAuthHeaders(),
		});

		return handleResponse(res);
	},

	getInsights: async () => {
		const res = await fetch(`${API_URL}/dashboard/insights`, {
			method: 'GET',
			headers: getAuthHeaders(),
		});

		return handleResponse(res);
	},
};

export default { authApi, tasksApi, dashboardApi };
