export default function Card({ children, className = '' }) {
	return <div className={`rounded-2xl border border-taskiq-border bg-white p-6 shadow-taskiq ${className}`}>{children}</div>;
}
