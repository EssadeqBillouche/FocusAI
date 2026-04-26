import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RegisterForm from '../../components/auth/RegisterForm.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Register() {
	const navigate = useNavigate();
	const { register, isLoading } = useAuth();

	const handleRegister = async (formData) => {
		const { confirmPassword, ...payload } = formData;

		if (formData.password !== formData.confirmPassword) {
			toast.error('Passwords do not match');
			return;
		}

		try {
			await register(payload);
			toast.success('Account created successfully');
			navigate('/dashboard');
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Registration failed');
		}
	};

	return (
		<div className="grid min-h-screen grid-cols-1 bg-taskiq-bg md:grid-cols-[42%_58%]">
			<section className="hidden items-end bg-gradient-to-br from-taskiq-primary to-taskiq-primary-dark p-12 text-white md:flex">
				<div>
					<h1 className="text-5xl font-extrabold leading-tight">Reclaim your mental space.</h1>
					<p className="mt-6 max-w-sm text-white/90">Create your account and build a clear system for deep work.</p>
				</div>
			</section>

			<section className="flex items-center justify-center px-6 py-14 sm:px-10">
				<div className="w-full max-w-xl rounded-2xl border border-taskiq-border bg-white p-8 shadow-taskiq">
					<h2 className="text-3xl font-bold tracking-tight text-taskiq-ink">Create your account</h2>
					<p className="mt-2 text-sm text-taskiq-soft">Build your productivity sanctuary in less than a minute.</p>

					<div className="mt-8">
						<RegisterForm onSubmit={handleRegister} isSubmitting={isLoading} />
					</div>
				</div>
			</section>
		</div>
	);
}
