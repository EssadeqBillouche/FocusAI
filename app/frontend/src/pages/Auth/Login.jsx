import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginForm from '../../components/auth/LoginForm.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Login() {
	const navigate = useNavigate();
	const { login, isLoading } = useAuth();

	const handleLogin = async (payload) => {
		try {
			await login(payload);
			toast.success('Welcome back to TaskIQ');
			navigate('/dashboard');
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Login failed');
		}
	};

	return (
		<div className="grid min-h-screen grid-cols-1 bg-taskiq-bg md:grid-cols-2">
			<section className="hidden flex-col justify-end bg-taskiq-primary p-12 text-white md:flex">
				<h1 className="max-w-md text-5xl font-extrabold leading-tight">A Digital Sanctuary for Focus.</h1>
				<p className="mt-6 max-w-md text-white/85">Step away from noise and orchestrate your priorities with intention.</p>
			</section>

			<section className="flex items-center justify-center px-6 py-14 sm:px-10">
				<div className="w-full max-w-md rounded-2xl border border-taskiq-border bg-white p-8 shadow-taskiq">
					<h2 className="text-3xl font-bold tracking-tight text-taskiq-ink">Welcome Back</h2>
					<p className="mt-2 text-sm text-taskiq-soft">Enter your credentials to access your workspace.</p>

					<div className="mt-8">
						<LoginForm onSubmit={handleLogin} isSubmitting={isLoading} />
					</div>
				</div>
			</section>
		</div>
	);
}
