import { useEffect, useState } from 'react';
import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';

const initialForm = {
	title: '',
	description: '',
	status: 'pending',
	priority: 'medium',
	deadline: '',
};

export default function TaskForm({ mode = 'create', initialValues = null, onSubmit, onCancel, isSubmitting = false }) {
	const [formData, setFormData] = useState(initialForm);

	useEffect(() => {
		if (!initialValues) {
			setFormData(initialForm);
			return;
		}

		setFormData({
			...initialValues,
			deadline: initialValues.deadline ? new Date(initialValues.deadline).toISOString().slice(0, 10) : '',
		});
	}, [initialValues]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-taskiq-border bg-white p-5 shadow-taskiq">
			<h3 className="text-lg font-bold text-taskiq-ink">{mode === 'edit' ? 'Update task' : 'Create a new task'}</h3>

			<Input name="title" label="Title" value={formData.title} onChange={handleChange} placeholder="Finalize strategy deck" required />

			<div className="space-y-2">
				<label className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">Description</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					rows={3}
					placeholder="Task context and expected outcome"
					className="w-full rounded-lg border border-taskiq-border bg-white px-4 py-3 text-sm text-taskiq-ink placeholder:text-taskiq-soft focus:border-taskiq-primary focus:outline-none"
				/>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<div className="space-y-2">
					<label className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">Status</label>
					<select
						name="status"
						value={formData.status}
						onChange={handleChange}
						className="w-full rounded-lg border border-taskiq-border bg-white px-4 py-3 text-sm text-taskiq-ink focus:border-taskiq-primary focus:outline-none"
					>
						<option value="pending">Pending</option>
						<option value="completed">Completed</option>
					</select>
				</div>

				<div className="space-y-2">
					<label className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">Priority</label>
					<select
						name="priority"
						value={formData.priority}
						onChange={handleChange}
						className="w-full rounded-lg border border-taskiq-border bg-white px-4 py-3 text-sm text-taskiq-ink focus:border-taskiq-primary focus:outline-none"
					>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</div>

				<Input name="deadline" type="date" label="Deadline" value={formData.deadline} onChange={handleChange} required />
			</div>

			<div className="flex items-center justify-end gap-2">
				{onCancel ? (
					<Button variant="secondary" onClick={onCancel}>
						Cancel
					</Button>
				) : null}
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Saving...' : mode === 'edit' ? 'Save changes' : 'Create task'}
				</Button>
			</div>
		</form>
	);
}
