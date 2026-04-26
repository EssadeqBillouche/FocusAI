import { useEffect, useMemo, useState } from 'react';
import AppShell from '../../components/layout/AppShell.jsx';
import Card from '../../components/ui/Card.jsx';
import { tasksApi } from '../../services/api.js';
import { toast } from 'react-toastify';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await tasksApi.getSmartPriority({ sortByDeadline: 'true' });
        setTasks(response.data?.data?.tasks || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load calendar tasks');
      }
    };

    loadTasks();
  }, []);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthTitle = useMemo(
    () => now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    [currentMonth, currentYear]
  );

  const tasksByDay = useMemo(() => {
    return tasks.reduce((acc, task) => {
      const deadline = new Date(task.deadline);
      if (deadline.getFullYear() !== currentYear || deadline.getMonth() !== currentMonth) {
        return acc;
      }

      const day = deadline.getDate();
      if (!acc[day]) acc[day] = [];
      acc[day].push(task);
      return acc;
    }, {});
  }, [tasks, currentMonth, currentYear]);

  const monthDays = useMemo(() => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i += 1) {
      days.push({
        day: i,
        tasks: tasksByDay[i] || [],
      });
    }
    return days;
  }, [currentMonth, currentYear, tasksByDay]);

  return (
    <AppShell title={monthTitle} subtitle="Your real task deadlines from database.">
      <Card>
        <div className="mb-5 grid grid-cols-7 gap-2">
          {weekDays.map((name) => (
            <p key={name} className="text-center text-xs font-bold uppercase tracking-[0.08em] text-taskiq-soft">
              {name}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {monthDays.map(({ day, tasks: dayTasks }) => (
            <article key={day} className={`min-h-28 rounded-xl border p-3 ${dayTasks.length ? 'border-taskiq-primary bg-taskiq-muted' : 'border-taskiq-border bg-taskiq-bg'}`}>
              <p className={`text-sm font-semibold ${dayTasks.length ? 'text-taskiq-primary' : 'text-taskiq-ink'}`}>{day}</p>
              {dayTasks.slice(0, 2).map((task) => (
                <p key={task._id} className="mt-2 truncate text-xs font-medium text-taskiq-soft">{task.title}</p>
              ))}
            </article>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
