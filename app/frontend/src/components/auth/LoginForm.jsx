import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

export default function LoginForm({ onSubmit, isSubmitting }) {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({ email: '', password: '' });

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<Input
				name="email"
				type="email"
				label="Email Address"
				placeholder="name@company.com"
				value={formData.email}
				onChange={handleChange}
				required
			/>

			<div className="space-y-2">
				<label className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">Password</label>
				<div className="relative">
					<Input
						name="password"
						type={showPassword ? 'text' : 'password'}
						placeholder="••••••••"
						value={formData.password}
						onChange={handleChange}
						required
						className="pr-10"
					/>
					<button
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-taskiq-soft"
					>
						{showPassword ? <FaEyeSlash /> : <FaEye />}
					</button>
				</div>
			</div>

			<Button type="submit" className="w-full" disabled={isSubmitting}>
				{isSubmitting ? 'Signing in...' : 'Sign In to TaskIQ'}
			</Button>

			<p className="text-center text-sm text-taskiq-soft">
				New here?
				<Link to="/register" className="ml-2 font-semibold text-taskiq-primary hover:underline">
					Create account
				</Link>
			</p>
		</form>
	);
}
