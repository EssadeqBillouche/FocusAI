import Card from '../ui/Card.jsx';
import { formatDate, getPriorityClass } from '../../utils/helpers.js';

export default function Summary({ urgentTasks = [] }) {
	return (
		<Card>
			<div className="mb-5 flex items-center justify-between">
				<h3 className="text-lg font-bold text-taskiq-ink">Curated Tasks</h3>
				<span className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">Urgent</span>
			</div>

			<div className="space-y-4">
				{urgentTasks.length === 0 ? (
					<p className="text-sm text-taskiq-soft">No urgent tasks for now. Great rhythm.</p>
				) : (
					urgentTasks.map((task) => (
						<article key={task._id} className="rounded-xl border border-taskiq-border bg-taskiq-bg p-4">
							<div className="mb-2 flex items-start justify-between gap-2">
								<h4 className="text-sm font-semibold text-taskiq-ink">{task.title}</h4>
								<span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getPriorityClass(task.priority)}`}>
									{task.priority}
								</span>
							</div>
							<p className="text-xs text-taskiq-soft">Due {formatDate(task.deadline)}</p>
						</article>
					))
				)}
			</div>
		</Card>
	);
}
