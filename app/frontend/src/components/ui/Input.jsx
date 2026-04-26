export default function Input({
	id,
	name,
	type = 'text',
	label,
	value,
	onChange,
	placeholder,
	required = false,
	className = '',
	...props
}) {
	return (
		<div className="space-y-2">
			{label && (
				<label htmlFor={id || name} className="text-xs font-semibold uppercase tracking-[0.08em] text-taskiq-soft">
					{label}
				</label>
			)}

			<input
				id={id || name}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				className={`w-full rounded-lg border border-taskiq-border bg-white px-4 py-3 text-sm text-taskiq-ink placeholder:text-taskiq-soft focus:border-taskiq-primary focus:outline-none ${className}`}
				{...props}
			/>
		</div>
	);
}
