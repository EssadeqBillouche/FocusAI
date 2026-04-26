import Input from '../ui/Input.jsx';

export default function TaskFilters({ filters, onChange }) {
	const handleFieldChange = (event) => {
		const { name, value } = event.target;
		onChange((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="grid grid-cols-1 gap-4 rounded-2xl border border-taskiq-border bg-white p-4 shadow-taskiq sm:grid-cols-2 lg:grid-cols-4">
			<Input name="search" label="Search" value={filters.search} onChange={handleFieldChange} placeholder="Find by title..." />

			<div className="space-y-2">
				<label className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">Status</label>
				<select
					name="status"
					value={filters.status}
					onChange={handleFieldChange}
					className="w-full rounded-lg border border-taskiq-border bg-white px-4 py-3 text-sm text-taskiq-ink focus:border-taskiq-primary focus:outline-none"
				>
					<option value="">All</option>
					<option value="pending">Pending</option>
					<option value="completed">Completed</option>
				</select>
			</div>

			<div className="space-y-2">
				<label className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">Priority</label>
				<select
					name="priority"
					value={filters.priority}
					onChange={handleFieldChange}
					className="w-full rounded-lg border border-taskiq-border bg-white px-4 py-3 text-sm text-taskiq-ink focus:border-taskiq-primary focus:outline-none"
				>
					<option value="">All</option>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
			</div>

			<div className="space-y-2">
				<label className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">Sort</label>
				<select
					name="sortByDeadline"
					value={filters.sortByDeadline}
					onChange={handleFieldChange}
					className="w-full rounded-lg border border-taskiq-border bg-white px-4 py-3 text-sm text-taskiq-ink focus:border-taskiq-primary focus:outline-none"
				>
					<option value="false">Latest created</option>
					<option value="true">Nearest deadline</option>
				</select>
			</div>
		</div>
	);
}
