import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, onEdit, onDelete, onToggleStatus }) {
	const pending = tasks.filter((task) => task.status === 'pending');
	const completed = tasks.filter((task) => task.status === 'completed');

	const columns = [
		{ title: 'To-Do', data: pending },
		{ title: 'Completed', data: completed },
	];

	return (
		<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
			{columns.map((column) => (
				<section key={column.title} className="rounded-2xl border border-taskiq-border bg-taskiq-surface p-4">
					<header className="mb-4 flex items-center justify-between">
						<h3 className="text-sm font-bold uppercase tracking-[0.08em] text-taskiq-soft">{column.title}</h3>
						<span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-taskiq-soft">{column.data.length}</span>
					</header>

					<div className="space-y-4">
						{column.data.length === 0 ? (
							<p className="rounded-lg border border-dashed border-taskiq-border bg-white p-4 text-center text-sm text-taskiq-soft">
								No tasks here yet.
							</p>
						) : (
							column.data.map((task) => (
								<TaskItem key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
							))
						)}
					</div>
				</section>
			))}
		</div>
	);
}
