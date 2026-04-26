import { useEffect, useMemo, useState } from 'react';
import AppShell from '../../components/layout/AppShell.jsx';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { dashboardApi, tasksApi } from '../../services/api.js';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/helpers.js';

const initialInsights = {
  total: 0,
  completed: 0,
  pending: 0,
  completionRate: 0,
};

export default function Home() {
  const [insights, setInsights] = useState(initialInsights);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [insightsResponse, recommendationsResponse] = await Promise.all([
          dashboardApi.getInsights(),
          tasksApi.getRecommendations(3),
        ]);

        setInsights(insightsResponse.data?.data?.insights || initialInsights);
        setRecommendations(recommendationsResponse.data?.data?.recommendations || []);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load home data');
      }
    };

    loadHomeData();
  }, []);

  const focusStatus = useMemo(() => {
    if (insights.pending === 0) return 'Balanced';
    if (insights.completionRate >= 70) return 'Productive';
    return 'Needs attention';
  }, [insights]);

  return (
    <AppShell title="Sanctuary" subtitle="A clear mind is the foundation of profound work.">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Card className="xl:col-span-8">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.08em] text-taskiq-soft">Current status</p>
              <h3 className="mt-2 text-3xl font-bold text-taskiq-ink">{focusStatus}</h3>
              <p className="mt-1 text-sm text-taskiq-soft">{insights.pending} pending tasks require focus.</p>
            </div>
            <span className="rounded-full bg-taskiq-muted px-3 py-1 text-xs font-semibold text-taskiq-primary">Flow mode</span>
          </div>

          <p className="text-5xl font-extrabold tracking-tight text-taskiq-primary">{insights.completionRate}%</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="secondary">Total: {insights.total}</Button>
            <Button>Completed: {insights.completed}</Button>
          </div>
        </Card>

        <Card className="xl:col-span-4">
          <p className="text-xs uppercase tracking-[0.08em] text-taskiq-soft">Clarity score</p>
          <p className="mt-3 text-5xl font-extrabold text-taskiq-primary">{Math.round(insights.completionRate)}</p>
          <p className="mt-2 text-sm text-taskiq-soft">Computed from your real completion rate and pending workload.</p>
        </Card>

        <Card className="xl:col-span-6">
          <h3 className="text-xl font-bold text-taskiq-ink">Recommended Next Tasks</h3>
          <div className="mt-4 space-y-4">
            {recommendations.length === 0 ? (
              <p className="text-sm text-taskiq-soft">No recommended tasks yet.</p>
            ) : (
              recommendations.map((task) => (
                <div key={task._id} className="rounded-xl border border-taskiq-border bg-taskiq-bg p-4">
                  <p className="font-semibold text-taskiq-ink">{task.title}</p>
                  <p className="mt-1 text-xs text-taskiq-soft">Due {formatDate(task.deadline)}</p>
                </div>
              ))
            )}
          </div>
        </Card>

        <div className="xl:col-span-6 overflow-hidden rounded-2xl border border-taskiq-border bg-gradient-to-br from-taskiq-primary to-taskiq-primary-dark p-8 text-white shadow-taskiq">
          <p className="text-xs uppercase tracking-[0.08em] text-white/80">Daily inspiration</p>
          <h3 className="mt-2 text-2xl font-bold">Cultivating Space</h3>
          <p className="mt-3 max-w-sm text-sm text-white/85">
            Your environment shapes your attention. Choose depth over noise.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
