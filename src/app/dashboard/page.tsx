const MOCK_CHALLENGES = [
	{ id: "c1", type: "Corrida", value: 47, unit: "KM", progress: 68 },
	{ id: "c2", type: "Ciclismo", value: 120, unit: "KM", progress: 45 },
	{ id: "c3", type: "Natação", value: 8, unit: "KM", progress: 30 },
	{ id: "c4", type: "Caminhada", value: 23, unit: "KM", progress: 82 },
	{ id: "c5", type: "Musculação", value: 14, unit: "DIAS", progress: 56 },
	{ id: "c6", type: "Yoga", value: 9, unit: "DIAS", progress: 90 },
	{ id: "c7", type: "Corrida", value: 31, unit: "KM", progress: 22 },
	{ id: "c8", type: "Ciclismo", value: 85, unit: "KM", progress: 61 },
	{ id: "c9", type: "HIIT", value: 6, unit: "DIAS", progress: 38 },
	{ id: "c10", type: "Corrida", value: 55, unit: "KM", progress: 77 },
	{ id: "c11", type: "Natação", value: 12, unit: "KM", progress: 15 },
];

export default function Page() {
	return (
		<div className="min-h-full bg-surface p-8">
			{/* Invites section */}
			<section className="mb-12">
				<div className="mb-4 flex items-baseline justify-between">
					<h2 className="font-display text-h5 font-bold tracking-tight text-on-surface">
						Convites
					</h2>
					<span className="font-display text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
						5 pendentes
					</span>
				</div>
				<div className="flex h-[220px] w-full items-center justify-center overflow-hidden rounded-2xl bg-surface-container">
					<span className="font-body text-sm text-on-surface-muted">
						Nenhum convite no momento
					</span>
				</div>
				<div className="mt-3 flex items-center justify-center gap-2">
					<span className="h-1.5 w-5 rounded-full bg-primary-lime" />
					<span className="h-1.5 w-1.5 rounded-full bg-surface-high" />
					<span className="h-1.5 w-1.5 rounded-full bg-surface-high" />
					<span className="h-1.5 w-1.5 rounded-full bg-surface-high" />
				</div>
			</section>

			{/* Active challenges */}
			<section>
				<div className="mb-6 flex items-baseline justify-between">
					<h2 className="font-display text-h5 font-bold tracking-tight text-on-surface">
						Desafios ativos
					</h2>
					<span className="font-display text-xs font-semibold uppercase tracking-widest text-on-surface-muted">
						{MOCK_CHALLENGES.length} ativos
					</span>
				</div>
				<div className="grid grid-cols-auto-fill-220 gap-4">
					{MOCK_CHALLENGES.map((challenge) => (
						<div
							key={challenge.id}
							className="group relative flex h-[200px] flex-col justify-between overflow-hidden rounded-2xl bg-surface-container p-5 transition-colors duration-200 hover:bg-surface-high"
						>
							<div className="flex items-center justify-between">
								<span className="font-display text-xs font-bold uppercase tracking-widest text-on-surface-muted">
									{challenge.type}
								</span>
								<span className="h-2 w-2 rounded-full bg-primary-lime" />
							</div>

							<div>
								<div className="mb-3 font-display tabular-nums">
									<span className="text-display-sm font-bold text-on-surface">
										{challenge.value}
									</span>
									<span className="ml-1.5 text-sm font-semibold text-on-surface-muted">
										{challenge.unit}
									</span>
								</div>
								<div className="h-1 w-full overflow-hidden rounded-full bg-surface-high">
									<div
										className="h-full rounded-full bg-primary-lime"
										style={{ width: `${challenge.progress}%` }}
									/>
								</div>
								<div className="mt-1.5 flex justify-between">
									<span className="font-body text-xs text-on-surface-muted">
										progresso
									</span>
									<span className="font-display text-xs font-semibold text-on-surface-muted">
										{challenge.progress}%
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
