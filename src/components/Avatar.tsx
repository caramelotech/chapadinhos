const COLORS = ["#C9FF00", "#FF6B35", "#00E5FF", "#FF3CAC", "#7B2FFF"];

interface AvatarProps {
	name: string;
	size?: number;
}

export default function Avatar({ name, size = 36 }: AvatarProps) {
	const initials = name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
	const color = COLORS[name.charCodeAt(0) % COLORS.length];

	return (
		<div
			className="flex flex-shrink-0 items-center justify-center rounded-full font-display font-bold"
			style={{
				width: size,
				height: size,
				background: `${color}22`,
				border: `1.5px solid ${color}44`,
				fontSize: size * 0.35,
				color,
				letterSpacing: "-0.02em",
			}}
		>
			{initials}
		</div>
	);
}
