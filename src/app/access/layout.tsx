export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="grid min-h-full place-items-center px-4">
			<div className="w-full max-w-[440px] rounded-2xl bg-surface-low px-8 pb-10 pt-8 ambient-glow">
				{children}
			</div>
		</main>
	);
}
