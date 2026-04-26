import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem('taskiq_token'));
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem('taskiq_user');
		return storedUser ? JSON.parse(storedUser) : null;
	});
	const [isLoading, setIsLoading] = useState(false);

	const persistSession = (nextToken, nextUser) => {
		localStorage.setItem('taskiq_token', nextToken);
		localStorage.setItem('taskiq_user', JSON.stringify(nextUser));
		setToken(nextToken);
		setUser(nextUser);
	};

	const clearSession = () => {
		localStorage.removeItem('taskiq_token');
		localStorage.removeItem('taskiq_user');
		setToken(null);
		setUser(null);
	};

	const login = async (credentials) => {
		setIsLoading(true);

		try {
			const response = await authApi.login(credentials);
			const nextToken = response.data?.token;
			const nextUser = response.data?.data?.user;
			persistSession(nextToken, nextUser);
			return nextUser;
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (payload) => {
		setIsLoading(true);

		try {
			const response = await authApi.register(payload);
			const nextToken = response.data?.token;
			const nextUser = response.data?.data?.user;
			persistSession(nextToken, nextUser);
			return nextUser;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const hydrateUserFromDb = async () => {
			if (!token) return;

			try {
				const response = await authApi.me();
				const dbUser = response.data?.data?.user;

				if (dbUser) {
					localStorage.setItem('taskiq_user', JSON.stringify(dbUser));
					setUser(dbUser);
				}
			} catch (_error) {
				clearSession();
			}
		};

		hydrateUserFromDb();
	}, [token]);

	const value = useMemo(
		() => ({
			user,
			token,
			isLoading,
			isAuthenticated: Boolean(token),
			login,
			register,
			logout: clearSession,
		}),
		[user, token, isLoading]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used inside AuthProvider');
	}

	return context;
}
