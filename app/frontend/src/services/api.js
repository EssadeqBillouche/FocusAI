import axios from 'axios';

const apiBaseUrl = (import.meta.env.VITE_API_URL || '/api-v1').trim();

const apiClient = axios.create({
	baseURL: apiBaseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('taskiq_token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 401) {
			localStorage.removeItem('taskiq_token');
			localStorage.removeItem('taskiq_user');
		}

		return Promise.reject(error);
	}
);

export const authApi = {
	register: (payload) => apiClient.post('/auth/register', payload),
	login: (payload) => apiClient.post('/auth/login', payload),
};

export const tasksApi = {
	getAll: (params = {}) => apiClient.get('/tasks', { params }),
	getSmartPriority: (params = {}) => apiClient.get('/tasks/smart-priority', { params }),
	getRecommendations: (limit = 5) => apiClient.get('/tasks/recommendations', { params: { limit } }),
	getById: (taskId) => apiClient.get(`/tasks/${taskId}`),
	create: (payload) => apiClient.post('/tasks', payload),
	update: (taskId, payload) => apiClient.patch(`/tasks/${taskId}`, payload),
	delete: (taskId) => apiClient.delete(`/tasks/${taskId}`),
};

export const dashboardApi = {
	getStats: () => apiClient.get('/dashboard/stats'),
	getInsights: () => apiClient.get('/dashboard/insights'),
};

export default apiClient;
