import Card from '../ui/Card.jsx';
import { formatDate, getPriorityClass } from '../../utils/helpers.js';

export default function RecommendedTasks({ tasks = [] }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-taskiq-ink">Recommended Next Tasks</h3>
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">AI rule-based</span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-taskiq-soft">No recommendations right now.</p>
        ) : (
          tasks.map((task) => (
            <article key={task._id} className="rounded-xl border border-taskiq-border bg-taskiq-bg p-3">
              <div className="mb-1 flex items-start justify-between gap-2">
                <h4 className="text-sm font-semibold text-taskiq-ink">{task.title}</h4>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getPriorityClass(task.smart?.computedPriority || task.priority)}`}>
                  {task.smart?.computedPriority || task.priority}
                </span>
              </div>
              <p className="text-xs text-taskiq-soft">Due {formatDate(task.deadline)}</p>
              {task.smart?.reason ? <p className="mt-1 text-xs text-taskiq-soft">{task.smart.reason}</p> : null}
            </article>
          ))
        )}
      </div>
    </Card>
  );
}
