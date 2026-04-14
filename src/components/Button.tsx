import clsx from "clsx";

interface ButtonProps {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	variant?: "primary" | "secondary" | "tertiary";
	disabled?: boolean;
	className?: string;
}

const Button = ({
	text,
	onClick,
	type = "button",
	variant = "primary",
	disabled = false,
	className,
}: ButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				"font-display font-semibold transition-all duration-200",
				variant === "primary" && [
					"w-full rounded-xl bg-primary-lime px-6 py-3 text-base text-on-primary",
					"hover:brightness-110 active:scale-[0.98]",
					"disabled:cursor-not-allowed disabled:opacity-50",
				],
				variant === "secondary" && [
					"w-full rounded-xl px-6 py-3 text-base text-on-surface ghost-border ghost-border-hover",
					"hover:text-primary-lime active:scale-[0.98]",
					"disabled:cursor-not-allowed disabled:opacity-50",
				],
				variant === "tertiary" && [
					"px-0 py-1 text-base text-on-surface-muted underline-offset-4",
					"hover:text-on-surface hover:underline",
					"disabled:cursor-not-allowed disabled:opacity-50",
				],
				className
			)}
		>
			{text}
		</button>
	);
};

export default Button;
