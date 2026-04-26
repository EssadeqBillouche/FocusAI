import Card from '../ui/Card.jsx';

export default function StatsCard({ title, value, subtitle, icon }) {
	const Icon = icon;

	return (
		<Card className="flex min-h-36 flex-col justify-between">
			<div className="flex items-start justify-between">
				<p className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">{title}</p>
				{Icon ? <Icon className="text-taskiq-soft" /> : null}
			</div>

			<div>
				<p className="text-4xl font-extrabold tracking-tight text-taskiq-primary">{value}</p>
				{subtitle ? <p className="mt-1 text-sm text-taskiq-soft">{subtitle}</p> : null}
			</div>
		</Card>
	);
}
