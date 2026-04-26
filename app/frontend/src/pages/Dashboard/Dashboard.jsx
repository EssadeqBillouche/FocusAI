import { useEffect, useState } from 'react';
import { FaCircleCheck, FaHourglassHalf, FaListUl, FaPercent } from 'react-icons/fa6';
import AppShell from '../../components/layout/AppShell.jsx';
import StatsCard from '../../components/dashboard/StatsCard.jsx';
import Chart from '../../components/dashboard/Chart.jsx';
import Summary from '../../components/dashboard/Summary.jsx';
import { dashboardApi } from '../../services/api.js';
import { toast } from 'react-toastify';

const initialStats = {
	total: 0,
	completed: 0,
	pending: 0,
	completionRate: 0,
	chartData: [],
	priorityData: [],
	recommendedTasks: [],
	urgentTasks: [],
};

export default function Dashboard() {
	const [stats, setStats] = useState(initialStats);

	useEffect(() => {
		const loadDashboard = async () => {
			try {
				const response = await dashboardApi.getInsights();
				setStats(response.data?.data?.insights || initialStats);
			} catch (error) {
				toast.error(error?.response?.data?.message || 'Failed to load dashboard');
			}
		};

		loadDashboard();
	}, []);

	return (
		<AppShell title="Good morning" subtitle="Clarity precedes success. Your sanctuary is prepared for deep work today.">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
				<StatsCard title="Total Tasks" value={stats.total} icon={FaListUl} />
				<StatsCard title="Completed" value={stats.completed} icon={FaCircleCheck} />
				<StatsCard title="Pending" value={stats.pending} icon={FaHourglassHalf} />
				<StatsCard title="Completion Rate" value={`${stats.completionRate}%`} icon={FaPercent} />
			</div>

			<div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1fr]">
				<Chart chartData={stats.chartData} priorityData={stats.priorityData} completionRate={stats.completionRate} />
				<Summary urgentTasks={stats.recommendedTasks} />
			</div>
		</AppShell>
	);
}
