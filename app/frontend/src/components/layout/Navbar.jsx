import { FaBell, FaMagnifyingGlass } from 'react-icons/fa6';
import { useAuth } from '../../context/AuthContext.jsx';
import { getInitials } from '../../utils/helpers.js';

export default function Navbar({ title, subtitle }) {
	const { user } = useAuth();

	return (
		<header className="flex flex-col gap-4 border-b border-taskiq-border bg-taskiq-bg/90 px-5 py-5 backdrop-blur sm:px-8">
			<div className="flex items-center justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold tracking-tight text-taskiq-ink">{title}</h2>
					{subtitle ? <p className="mt-1 text-sm text-taskiq-soft">{subtitle}</p> : null}
				</div>

				<div className="flex items-center gap-2">
					<button className="rounded-full p-2 text-taskiq-soft transition hover:bg-taskiq-surface hover:text-taskiq-ink">
						<FaMagnifyingGlass />
					</button>
					<button className="rounded-full p-2 text-taskiq-soft transition hover:bg-taskiq-surface hover:text-taskiq-ink">
						<FaBell />
					</button>
					<div className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-taskiq-primary text-xs font-bold text-white">
						{getInitials(user?.firstName, user?.lastName)}
					</div>
				</div>
			</div>
		</header>
	);
}
