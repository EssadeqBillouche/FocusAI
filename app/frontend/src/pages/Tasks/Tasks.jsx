import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import AppShell from '../../components/layout/AppShell.jsx';
import TaskForm from '../../components/tasks/TaskForm.jsx';
import TaskFilters from '../../components/tasks/TaskFilters.jsx';
import TaskList from '../../components/tasks/TaskList.jsx';
import { tasksApi } from '../../services/api.js';

const defaultFilters = {
	search: '',
	status: '',
	priority: '',
	sortByDeadline: 'false',
};

export default function Tasks() {
	const [tasks, setTasks] = useState([]);
	const [filters, setFilters] = useState(defaultFilters);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [editingTask, setEditingTask] = useState(null);

	const queryParams = useMemo(() => {
		const params = {};
		if (filters.search) params.search = filters.search;
		if (filters.status) params.status = filters.status;
		if (filters.priority) params.priority = filters.priority;
		params.sortByDeadline = filters.sortByDeadline;
		params.smartSort = 'true';
		return params;
	}, [filters]);

	const fetchTasks = async () => {
		try {
			const response = await tasksApi.getAll(queryParams);
			setTasks(response.data?.data?.tasks || []);
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Failed to fetch tasks');
		}
	};

	useEffect(() => {
		fetchTasks();
	}, [queryParams]);

	const handleCreateOrUpdate = async (payload) => {
		setIsSubmitting(true);

		try {
			if (editingTask) {
				await tasksApi.update(editingTask._id, payload);
				toast.success('Task updated');
			} else {
				await tasksApi.create(payload);
				toast.success('Task created');
			}

			setEditingTask(null);
			await fetchTasks();
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Operation failed');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (taskId) => {
		try {
			await tasksApi.delete(taskId);
			toast.success('Task deleted');
			await fetchTasks();
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Delete failed');
		}
	};

	const handleToggleStatus = async (task) => {
		const nextStatus = task.status === 'completed' ? 'pending' : 'completed';

		try {
			await tasksApi.update(task._id, { status: nextStatus });
			await fetchTasks();
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Status update failed');
		}
	};

	return (
		<AppShell title="Q3 Deliverables" subtitle="Design system refinement and core feature implementation.">
			<div className="space-y-6">
				<TaskFilters filters={filters} onChange={setFilters} />

				<TaskForm
					mode={editingTask ? 'edit' : 'create'}
					initialValues={editingTask}
					onSubmit={handleCreateOrUpdate}
					onCancel={editingTask ? () => setEditingTask(null) : undefined}
					isSubmitting={isSubmitting}
				/>

				<TaskList
					tasks={tasks}
					onEdit={setEditingTask}
					onDelete={handleDelete}
					onToggleStatus={handleToggleStatus}
				/>
			</div>
		</AppShell>
	);
}
