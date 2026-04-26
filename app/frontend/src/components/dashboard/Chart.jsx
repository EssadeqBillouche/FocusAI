import Card from '../ui/Card.jsx';

export default function Chart({ completed = 0, pending = 0 }) {
	const total = completed + pending;
	const completedRate = total ? Math.round((completed / total) * 100) : 0;

	return (
		<Card>
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-taskiq-ink">Deep Work Index</h3>
				<span className="rounded-full bg-taskiq-muted px-3 py-1 text-xs font-semibold text-taskiq-soft">
					{completedRate}% completed
				</span>
			</div>

			<div className="flex h-36 items-end gap-3">
				<div className="w-1/2 rounded-t-lg bg-taskiq-primary" style={{ height: `${Math.max(completedRate, 12)}%` }} />
				<div className="w-1/2 rounded-t-lg bg-taskiq-secondary" style={{ height: `${Math.max(100 - completedRate, 12)}%` }} />
			</div>

			<div className="mt-4 flex items-center justify-between text-xs font-medium text-taskiq-soft">
				<span>Completed</span>
				<span>Pending</span>
			</div>
		</Card>
	);
}
