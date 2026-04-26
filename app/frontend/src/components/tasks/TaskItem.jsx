import { FaPenToSquare, FaTrashCan } from 'react-icons/fa6';
import Button from '../ui/Button.jsx';
import { formatDate, getPriorityClass } from '../../utils/helpers.js';

export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
	const isCompleted = task.status === 'completed';

	return (
		<article className="rounded-xl border border-taskiq-border bg-white p-4 shadow-taskiq">
			<div className="mb-3 flex items-start justify-between gap-3">
				<div>
					<h4 className={`text-sm font-semibold ${isCompleted ? 'text-taskiq-soft line-through' : 'text-taskiq-ink'}`}>{task.title}</h4>
					<p className="mt-1 text-xs text-taskiq-soft">Due {formatDate(task.deadline)}</p>
				</div>

				<span className={`rounded-full px-2 py-1 text-xs font-semibold ${getPriorityClass(task.priority)}`}>{task.priority}</span>
			</div>

			{task.description ? <p className="mb-4 text-sm text-taskiq-soft">{task.description}</p> : null}

			<div className="flex flex-wrap items-center gap-2">
				<Button
					variant={isCompleted ? 'secondary' : 'primary'}
					className="px-3 py-2 text-xs"
					onClick={() => onToggleStatus(task)}
				>
					{isCompleted ? 'Mark pending' : 'Mark complete'}
				</Button>

				<Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onEdit(task)}>
					<span className="inline-flex items-center gap-1">
						<FaPenToSquare />
						Edit
					</span>
				</Button>

				<Button variant="danger" className="px-3 py-2 text-xs" onClick={() => onDelete(task._id)}>
					<span className="inline-flex items-center gap-1">
						<FaTrashCan />
						Delete
					</span>
				</Button>
			</div>
		</article>
	);
}
