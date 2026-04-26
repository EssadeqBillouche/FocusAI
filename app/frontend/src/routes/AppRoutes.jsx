import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Login from '../pages/Auth/Login.jsx';
import Register from '../pages/Auth/Register.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import Tasks from '../pages/Tasks/Tasks.jsx';
import Home from '../pages/Home/Home.jsx';
import Calendar from '../pages/Calendar/Calendar.jsx';
import Profile from '../pages/Profile/Profile.jsx';

function PublicOnlyRoute({ children }) {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

export default function AppRoutes() {
	const { isAuthenticated } = useAuth();

	return (
		<Routes>
			<Route
				path="/login"
				element={
					<PublicOnlyRoute>
						<Login />
					</PublicOnlyRoute>
				}
			/>

			<Route
				path="/register"
				element={
					<PublicOnlyRoute>
						<Register />
					</PublicOnlyRoute>
				}
			/>

			<Route element={<ProtectedRoute />}>
				<Route path="/home" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/tasks" element={<Tasks />} />
				<Route path="/calendar" element={<Calendar />} />
				<Route path="/profile" element={<Profile />} />
			</Route>

			<Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
		</Routes>
	);
}
