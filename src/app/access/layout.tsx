export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="grid min-h-full place-items-center px-4 py-8">
			<div className="w-full max-w-[440px] rounded-2xl bg-surface-low px-6 pb-10 pt-8 ambient-glow md:px-8">
				{children}
			</div>
		</main>
	);
}
