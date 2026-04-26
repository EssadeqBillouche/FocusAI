import { Link } from 'react-router-dom';
import { useState } from 'react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

export default function RegisterForm({ onSubmit, isSubmitting }) {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

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
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<Input
					name="firstName"
					label="First Name"
					placeholder="Alex"
					value={formData.firstName}
					onChange={handleChange}
					required
				/>

				<Input
					name="lastName"
					label="Last Name"
					placeholder="Martin"
					value={formData.lastName}
					onChange={handleChange}
					required
				/>
			</div>

			<Input
				name="email"
				type="email"
				label="Email Address"
				placeholder="alex@taskiq.com"
				value={formData.email}
				onChange={handleChange}
				required
			/>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<Input
					name="password"
					type="password"
					label="Password"
					placeholder="••••••••"
					value={formData.password}
					onChange={handleChange}
					required
				/>

				<Input
					name="confirmPassword"
					type="password"
					label="Confirm"
					placeholder="••••••••"
					value={formData.confirmPassword}
					onChange={handleChange}
					required
				/>
			</div>

			<Button type="submit" className="w-full" disabled={isSubmitting}>
				{isSubmitting ? 'Creating account...' : 'Create Account'}
			</Button>

			<p className="text-center text-sm text-taskiq-soft">
				Already have an account?
				<Link to="/login" className="ml-2 font-semibold text-taskiq-primary hover:underline">
					Sign in
				</Link>
			</p>
		</form>
	);
}
