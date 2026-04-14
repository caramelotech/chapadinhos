import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface InputProps
	extends Pick<
		InputHTMLAttributes<HTMLInputElement>,
		| "type"
		| "placeholder"
		| "value"
		| "onChange"
		| "name"
		| "id"
		| "autoComplete"
		| "required"
	> {
	label?: string;
	error?: string;
	className?: string;
}

const Input = ({
	type,
	placeholder,
	value,
	onChange,
	name,
	id,
	label,
	error,
	className,
	autoComplete,
	required,
}: InputProps) => {
	return (
		<div className={clsx("mb-4 flex flex-col gap-1.5", className)}>
			{label && (
				<label
					htmlFor={id}
					className="font-display text-xs font-semibold uppercase tracking-widest text-on-surface-muted"
				>
					{label}
				</label>
			)}
			<input
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoComplete={autoComplete}
				required={required}
				className={clsx(
					"w-full rounded-xl bg-surface-lowest px-4 py-3 text-base text-on-surface",
					"placeholder:text-on-surface-muted/50",
					"transition-all duration-200",
					"input-focus",
					error && "shadow-[inset_0_0_0_1px_rgba(239,68,68,0.5)]"
				)}
			/>
			{error && <span className="text-xs text-red-400">{error}</span>}
		</div>
	);
};

export default Input;
