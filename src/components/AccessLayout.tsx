interface AccessLayoutProps {
	title: string;
	subtitle: string;
	children: React.ReactNode;
}

export default function AccessLayout({
	title,
	subtitle,
	children,
}: AccessLayoutProps) {
	return (
		<div>
			<h1 className="font-display text-display-sm font-bold tracking-tight text-on-surface">
				{title}
			</h1>
			<p className="mb-8 mt-2 text-base text-on-surface-muted">{subtitle}</p>
			{children}
		</div>
	);
}
