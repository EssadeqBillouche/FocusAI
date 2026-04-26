import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppRoutes />
				<ToastContainer
					position="top-right"
					autoClose={2500}
					hideProgressBar={false}
					newestOnTop
					closeOnClick
					pauseOnHover
					theme="light"
				/>
			</AuthProvider>
		</BrowserRouter>
	);
}
