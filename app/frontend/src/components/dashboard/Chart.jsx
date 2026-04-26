import Card from '../ui/Card.jsx';
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Chart({ chartData = [], priorityData = [], completionRate = 0 }) {
	return (
		<Card className="space-y-8">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-bold text-taskiq-ink">Productivity Insights</h3>
				<span className="rounded-full bg-taskiq-muted px-3 py-1 text-xs font-semibold text-taskiq-soft">{completionRate}% completed</span>
			</div>

			<div className="h-64">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={chartData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis allowDecimals={false} />
						<Tooltip />
						<Legend />
						<Bar dataKey="value" name="Tasks" fill="#416463" radius={[8, 8, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>

			<div className="h-64">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Tooltip />
						<Legend />
						<Pie
							data={priorityData}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={90}
							fill="#9cc3c1"
							label
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		</Card>
	);
}
