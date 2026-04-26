export default function Button({
	children,
	type = 'button',
	variant = 'primary',
	className = '',
	disabled = false,
	...props
}) {
	const variants = {
		primary: 'bg-taskiq-primary text-white hover:bg-taskiq-primary-dark',
		secondary: 'bg-taskiq-surface border border-taskiq-border text-taskiq-ink hover:bg-taskiq-muted',
		ghost: 'text-taskiq-primary hover:bg-taskiq-surface',
		danger: 'bg-red-600 text-white hover:bg-red-700',
	};

	return (
		<button
			type={type}
			disabled={disabled}
			className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
