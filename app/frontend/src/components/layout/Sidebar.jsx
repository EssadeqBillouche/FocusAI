import { NavLink } from 'react-router-dom';
import { FaCalendarDays, FaChartLine, FaHouse, FaListCheck, FaRightFromBracket, FaUser } from 'react-icons/fa6';
import Button from '../ui/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const navItems = [
	{ to: '/home', label: 'Sanctuary', icon: FaHouse },
	{ to: '/dashboard', label: 'Dashboard', icon: FaChartLine },
	{ to: '/tasks', label: 'Tasks', icon: FaListCheck },
	{ to: '/calendar', label: 'Calendar', icon: FaCalendarDays },
	{ to: '/profile', label: 'Profile', icon: FaUser },
];

export default function Sidebar() {
	const { logout } = useAuth();

	return (
		<aside className="hidden w-72 shrink-0 border-r border-taskiq-border bg-taskiq-surface p-6 lg:flex lg:flex-col">
			<div className="mb-8">
				<h1 className="text-2xl font-extrabold tracking-tight text-taskiq-primary">TaskIQ</h1>
				<p className="mt-1 text-xs uppercase tracking-[0.14em] text-taskiq-soft">Precision Serenity</p>
			</div>

			<nav className="flex flex-1 flex-col gap-2">
				{navItems.map(({ to, label, icon: Icon }) => (
					<NavLink
						key={to}
						to={to}
						className={({ isActive }) =>
							`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
								isActive
									? 'bg-white text-taskiq-primary shadow-taskiq'
									: 'text-taskiq-soft hover:bg-white hover:text-taskiq-primary'
							}`
						}
					>
						<Icon className="text-base" />
						{label}
					</NavLink>
				))}
			</nav>

			<Button variant="secondary" className="mt-6 w-full justify-center" onClick={logout}>
				<span className="inline-flex items-center gap-2">
					<FaRightFromBracket />
					Logout
				</span>
			</Button>
		</aside>
	);
}
